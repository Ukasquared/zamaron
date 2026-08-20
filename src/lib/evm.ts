export interface DisassembledOp {
  pc: string;
  opcode: string;
  comment: string;
}

export interface TraceStep {
  pc: string;
  opcode: string;
  stack: string;
}

const BASE_OPCODES: Record<number, { name: string; extra: number; comment: string }> = {
  0x00: { name: 'STOP', extra: 0, comment: 'Halt execution' },
  0x01: { name: 'ADD', extra: 0, comment: 'a + b' },
  0x02: { name: 'MUL', extra: 0, comment: 'a * b' },
  0x03: { name: 'SUB', extra: 0, comment: 'a - b' },
  0x04: { name: 'DIV', extra: 0, comment: 'a / b' },
  0x05: { name: 'SDIV', extra: 0, comment: 'Signed division' },
  0x06: { name: 'MOD', extra: 0, comment: 'a % b' },
  0x10: { name: 'LT', extra: 0, comment: 'a < b' },
  0x11: { name: 'GT', extra: 0, comment: 'a > b' },
  0x14: { name: 'EQ', extra: 0, comment: 'a == b' },
  0x15: { name: 'ISZERO', extra: 0, comment: 'a == 0' },
  0x16: { name: 'AND', extra: 0, comment: 'Bitwise AND' },
  0x17: { name: 'OR', extra: 0, comment: 'Bitwise OR' },
  0x18: { name: 'XOR', extra: 0, comment: 'Bitwise XOR' },
  0x19: { name: 'NOT', extra: 0, comment: 'Bitwise NOT' },
  0x1a: { name: 'BYTE', extra: 0, comment: 'Extract byte' },
  0x20: { name: 'SHA3', extra: 0, comment: 'Keccak-256 hash' },
  0x30: { name: 'ADDRESS', extra: 0, comment: 'Current contract address' },
  0x31: { name: 'BALANCE', extra: 0, comment: 'Get balance of address' },
  0x32: { name: 'ORIGIN', extra: 0, comment: 'tx.origin' },
  0x33: { name: 'CALLER', extra: 0, comment: 'msg.sender' },
  0x34: { name: 'CALLVALUE', extra: 0, comment: 'msg.value' },
  0x35: { name: 'CALLDATALOAD', extra: 0, comment: 'Read calldata word' },
  0x36: { name: 'CALLDATASIZE', extra: 0, comment: 'Length of calldata' },
  0x37: { name: 'CALLDATACOPY', extra: 0, comment: 'Copy calldata to memory' },
  0x38: { name: 'CODESIZE', extra: 0, comment: 'Size of code' },
  0x39: { name: 'CODECOPY', extra: 0, comment: 'Copy code to memory' },
  0x3a: { name: 'GASPRICE', extra: 0, comment: 'tx.gasprice' },
  0x3b: { name: 'EXTCODESIZE', extra: 0, comment: 'Foreign code size' },
  0x3d: { name: 'RETURNDATASIZE', extra: 0, comment: 'Size of return data' },
  0x3e: { name: 'RETURNDATACOPY', extra: 0, comment: 'Copy return data' },
  0x40: { name: 'BLOCKHASH', extra: 0, comment: 'Hash of recent block' },
  0x41: { name: 'COINBASE', extra: 0, comment: 'Current miner' },
  0x42: { name: 'TIMESTAMP', extra: 0, comment: 'block.timestamp' },
  0x43: { name: 'NUMBER', extra: 0, comment: 'block.number' },
  0x44: { name: 'DIFFICULTY', extra: 0, comment: 'block.prevrandao' },
  0x45: { name: 'GASLIMIT', extra: 0, comment: 'block.gaslimit' },
  0x46: { name: 'CHAINID', extra: 0, comment: 'chainid' },
  0x50: { name: 'POP', extra: 0, comment: 'Discard top stack item' },
  0x51: { name: 'MLOAD', extra: 0, comment: 'Load word from memory' },
  0x52: { name: 'MSTORE', extra: 0, comment: 'Store word to memory' },
  0x53: { name: 'MSTORE8', extra: 0, comment: 'Store byte to memory' },
  0x54: { name: 'SLOAD', extra: 0, comment: 'Load word from storage' },
  0x55: { name: 'SSTORE', extra: 0, comment: 'Store word to storage' },
  0x56: { name: 'JUMP', extra: 0, comment: 'Unconditional jump' },
  0x57: { name: 'JUMPI', extra: 0, comment: 'Conditional jump' },
  0x58: { name: 'PC', extra: 0, comment: 'Program counter' },
  0x59: { name: 'MSIZE', extra: 0, comment: 'Memory size' },
  0x5a: { name: 'GAS', extra: 0, comment: 'Remaining gas' },
  0x5b: { name: 'JUMPDEST', extra: 0, comment: 'Valid jump destination' },
  0xf0: { name: 'CREATE', extra: 0, comment: 'Create new contract' },
  0xf1: { name: 'CALL', extra: 0, comment: 'Message call' },
  0xf2: { name: 'CALLCODE', extra: 0, comment: 'Call into this code' },
  0xf3: { name: 'RETURN', extra: 0, comment: 'Return output data' },
  0xf4: { name: 'DELEGATECALL', extra: 0, comment: 'Delegate call' },
  0xfa: { name: 'STATICCALL', extra: 0, comment: 'Static call' },
  0xfd: { name: 'REVERT', extra: 0, comment: 'Revert state changes' },
  0xfe: { name: 'INVALID', extra: 0, comment: 'Invalid opcode' },
  0xff: { name: 'SELFDESTRUCT', extra: 0, comment: 'Destroy contract' },
};

function opcodeAt(byte: number): { name: string; extra: number; comment: string } {
  if (byte >= 0x60 && byte <= 0x7f) {
    const n = byte - 0x5f;
    return { name: `PUSH${n}`, extra: n, comment: `Push ${n} byte${n === 1 ? '' : 's'} onto stack` };
  }
  if (byte >= 0x80 && byte <= 0x8f) {
    const n = byte - 0x7f;
    return { name: `DUP${n}`, extra: 0, comment: `Duplicate stack item ${n}` };
  }
  if (byte >= 0x90 && byte <= 0x9f) {
    const n = byte - 0x8f;
    return { name: `SWAP${n}`, extra: 0, comment: `Swap stack items 1 and ${n + 1}` };
  }
  if (byte >= 0xa0 && byte <= 0xa4) {
    const n = byte - 0x9f;
    return { name: `LOG${n}`, extra: 0, comment: `Append log with ${n} topic${n === 1 ? '' : 's'}` };
  }
  return BASE_OPCODES[byte] ?? { name: `UNKNOWN_0x${byte.toString(16)}`, extra: 0, comment: 'Unrecognized opcode' };
}

export function normalizeBytecode(input: string): string {
  return input.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '').toLowerCase();
}

export function disassembleBytecode(input: string): DisassembledOp[] {
  const hex = normalizeBytecode(input);
  if (hex.length < 2 || hex.length % 2 !== 0) {
    throw new Error('Bytecode must be even-length hexadecimal.');
  }

  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }

  const ops: DisassembledOp[] = [];
  let pc = 0;
  while (pc < bytes.length) {
    const byte = bytes[pc];
    const meta = opcodeAt(byte);
    let immediate = '';
    if (meta.extra > 0) {
      const slice = bytes.slice(pc + 1, pc + 1 + meta.extra);
      immediate = slice.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    ops.push({
      pc: pc.toString(16).padStart(4, '0'),
      opcode: immediate ? `${meta.name} 0x${immediate}` : meta.name,
      comment: meta.comment,
    });
    pc += 1 + meta.extra;
  }
  return ops;
}

export function symbolicTrace(input: string, limit = 48): TraceStep[] {
  const ops = disassembleBytecode(input);
  const stack: string[] = [];
  const steps: TraceStep[] = [];

  for (const op of ops.slice(0, limit)) {
    const [name, imm] = op.opcode.split(' ');
    if (name.startsWith('PUSH')) {
      stack.push(imm || '0x0');
    } else if (name.startsWith('DUP')) {
      const n = Number(name.slice(3)) || 1;
      const item = stack[stack.length - n];
      if (item) stack.push(item);
    } else if (name.startsWith('SWAP')) {
      const n = Number(name.slice(4)) || 1;
      const i = stack.length - 1;
      const j = stack.length - 1 - n;
      if (i >= 0 && j >= 0) {
        const tmp = stack[i];
        stack[i] = stack[j];
        stack[j] = tmp;
      }
    } else if (name === 'POP') {
      stack.pop();
    } else if (['ADD', 'MUL', 'SUB', 'DIV', 'LT', 'GT', 'EQ', 'AND', 'OR', 'XOR'].includes(name)) {
      const b = stack.pop() ?? '?';
      const a = stack.pop() ?? '?';
      stack.push(`${name}(${a},${b})`);
    } else if (['ISZERO', 'NOT'].includes(name)) {
      const a = stack.pop() ?? '?';
      stack.push(`${name}(${a})`);
    } else if (['MSTORE', 'SSTORE', 'JUMPI'].includes(name)) {
      stack.pop();
      stack.pop();
    } else if (['MLOAD', 'SLOAD', 'CALLVALUE', 'CALLER', 'ADDRESS', 'GAS', 'TIMESTAMP'].includes(name)) {
      stack.push(name);
    }

    steps.push({
      pc: op.pc,
      opcode: op.opcode,
      stack: stack.slice(-6).join(' | ') || '∅',
    });
  }

  return steps;
}
