// Streams ->

/* process.stdin
    .pipe(process.stdout) */


import { Readable, Writable, Transform,  } from "node:stream"

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                
                this.push(buf)
            }
        }, 1000);
    }
}

class InverseNuumberSteam extends Transform{
    _transform(chunk, encoding, callback){

        const transformed = Number(chunk.toString()* -1)

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyTenStream extends Writable{
    _write(chuck, encoding, callback){
        console.log(Number(chuck.toString())* 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNuumberSteam())
    .pipe(new MultiplyTenStream())