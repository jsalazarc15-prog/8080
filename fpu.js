 // Javier Adolfo Salazar Carias
  // carne:0900-22-1009
class FPU {
    constructor() {
        // Buffers para conversiones IEEE 754
        this.bufA = new ArrayBuffer(4);
        this.viewA = new DataView(this.bufA);
        this.floatA = new Float32Array(this.bufA);

        this.bufB = new ArrayBuffer(4);
        this.viewB = new DataView(this.bufB);
        this.floatB = new Float32Array(this.bufB);

        this.bufRes = new ArrayBuffer(4);
        this.viewRes = new DataView(this.bufRes);
        this.floatRes = new Float32Array(this.bufRes);

        this.resultado = 0;
    }

    escribirByte(puerto, valor) {
        if (puerto >= 0x10 && puerto <= 0x13) {
            this.viewA.setUint8(puerto - 0x10, valor);
        } else if (puerto >= 0x14 && puerto <= 0x17) {
            this.viewB.setUint8(puerto - 0x14, valor);
        }
        this.actualizarUI();
    }

    ejecutarOperacion(op) {
        let a = this.floatA[0];
        let b = this.floatB[0];
        
        switch(op) {
            case 1: this.resultado = a + b; break;
            case 2: this.resultado = a - b; break;
            case 3: this.resultado = a * b; break;
            case 4: this.resultado = (b !== 0) ? a / b : 0; break;
            default: this.resultado = 0;
        }
        
        this.floatRes[0] = this.resultado;
        this.actualizarUI();
    }

    leerByteResultado(indice) {
        return this.viewRes.getUint8(indice);
    }

    actualizarUI() {
        const panel = document.getElementById('panel-fpu');
        if(panel) {
            panel.innerHTML = `
                <span style="color: #4fc3f7; font-weight: bold;">Op A:</span> <span style="color: #e0e0e0;">${this.floatA[0].toFixed(4)}</span> <br>
                <span style="color: #4fc3f7; font-weight: bold;">Op B:</span> <span style="color: #e0e0e0;">${this.floatB[0].toFixed(4)}</span> <br>
                <span style="color: #fff176; font-weight: bold;">Resultado:</span> <span style="color: white; font-weight: bold;">${this.resultado.toFixed(4)}</span>
            `;
        }
    }
}
const fpu = new FPU();