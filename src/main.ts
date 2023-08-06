const memory = {
  u8: new Uint8Array(),
}

const imports = {
  env: {
    return_output(ptr: number, size: number) {
      const decoder = new TextDecoder()
      const output = memory.u8.subarray(ptr, ptr + size)
      const decodedOutput = decoder.decode(output)
      const result = JSON.parse(decodedOutput)

      console.table(result)
    },
  },
  wasi_snapshot_preview1: {
    proc_exit: (...args: any[]) => console.log('proc_exit', args)
  },
}

WebAssembly.instantiateStreaming(fetch('main.wasm'), imports).then((obj) => {
  memory.u8 = new Uint8Array(obj.instance.exports.memory.buffer)

  const str = 'this this text is very is very is very is very repetitive, yeah it is'
  const size = str.length

  const ptr = obj.instance.exports.alloc(size)
  const encoder = new TextEncoder()
  const encodedStr = encoder.encode(str)

  memory.u8.set(encodedStr, ptr)

  obj.instance.exports.analyse(ptr)
})