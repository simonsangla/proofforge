// Generates solid-color PNG icons for the PWA without any image dependency.
// Run: node scripts/build-icons.mjs
// Outputs: public/icon-192.png, public/icon-512.png, public/apple-touch-icon.png

import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { mkdirSync } from "node:fs";

// CRC-32 table (polynomial 0xEDB88320)
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// Draw a solid fill with a small centered square "mark" in a second color.
function makePng(size, bg, fg) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const markStart = Math.floor(size * 0.3);
  const markEnd = Math.floor(size * 0.7);

  const rowLen = 1 + size * 3;
  const raw = Buffer.alloc(rowLen * size);
  for (let y = 0; y < size; y++) {
    const rowOff = y * rowLen;
    raw[rowOff] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const inMark = x >= markStart && x < markEnd && y >= markStart && y < markEnd;
      const px = rowOff + 1 + x * 3;
      const c = inMark ? fg : bg;
      raw[px] = c[0];
      raw[px + 1] = c[1];
      raw[px + 2] = c[2];
    }
  }

  const idat = deflateSync(raw);

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

// ProofForge palette
const INK = [0x14, 0x13, 0x12]; // #141312
const PAPER = [0xf4, 0xef, 0xe8]; // #f4efe8

mkdirSync("public", { recursive: true });
writeFileSync("public/icon-192.png", makePng(192, INK, PAPER));
writeFileSync("public/icon-512.png", makePng(512, INK, PAPER));
writeFileSync("public/apple-touch-icon.png", makePng(180, INK, PAPER));
console.log("icons written: public/icon-192.png, icon-512.png, apple-touch-icon.png");
