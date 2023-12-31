import { RegistrationParams } from "../../../state-management/auth/store";
import Module from "./EmccBsspeke.js";

// Class to wrap the bsspeke client and interact with emscripten compiled code
class Client {
  private ctx: any;
  private useModule: any; // Module object from emscripten compiled bsspeke code that provides access to the compiled functions
  private moduleInitialized: Promise<void>; // Promise that resolves when the emscripten module is initialized (added for module support of emscripten compiled Bsspeke code)

  constructor(user_id: string, server_id: string, password: string) {
    this.moduleInitialized = new Promise((resolve) => {
      Module().then((Module) => {
        this.useModule = Module;
        console.log("useModule: ", this.useModule);
      
        const uid_utf8 = encodeUTF8(user_id);
        console.log("decoded uid_utf8: ", uid_utf8, "uid_utf8.length: ", uid_utf8.length);
        const sid_utf8 = encodeUTF8(server_id);
        console.log("sid_utf8: ", sid_utf8, "sid_utf8.length: ", sid_utf8.length);
        const pwd_utf8 = encodeUTF8(password);
        console.log("pwd_utf8: ", pwd_utf8, "pwd_utf8.length: ", pwd_utf8.length);

        // Calling emscriten compiled bsspeke code to generate client
        this.ctx = this.useModule.ccall("generate_client", "number", [], []);
        console.log("ctx: ", this.ctx);
        const success = this.useModule.ccall("bsspeke_client_init", "number", ["number", "string", "number", "string", "number", "string", "number"], [this.ctx, uid_utf8, uid_utf8.length, sid_utf8, sid_utf8.length, pwd_utf8, pwd_utf8.length]);
        console.log("Client init success: ", success);
        resolve();
      });
    });
  }

  // Generates a blind for the client
  async generateBlind(): Promise<Uint8Array> {
    await this.moduleInitialized;

    const blindPointer = this.useModule.ccall("bsspeke_client_generate_blind", "number", ["array", "number"], [new Uint8Array(32), this.ctx]);
    const blind = new Uint8Array(this.useModule.HEAPU8.buffer, blindPointer, 32);
    return blind;

  }

  // Generates P and V hashes for the client
  generatePAndV(blind_salt: Uint8Array, passwordParams: RegistrationParams["m.enroll.bsspeke-ecc.oprf"]["phf_params"]): { PArray: Uint8Array; VArray: Uint8Array } {
    const P = this.useModule._malloc(32);
    const V = this.useModule._malloc(32);
    const blocks = passwordParams["blocks"];
    const iterations = passwordParams["iterations"];

    this.useModule.ccall("bsspeke_client_generate_P_and_V", "number", ["number", "number", "array", "number", "number", "number"], [P, V, blind_salt, blocks, iterations, this.ctx]);

    const PArray = new Uint8Array(this.useModule.HEAPU8.buffer, P, 32);
    const VArray = new Uint8Array(this.useModule.HEAPU8.buffer, V, 32);

    return { PArray, VArray };
  }
}

function encodeUTF8(str: string): string {
  
  // Encode the string from UTF-16 to UTF-8
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(str);

  // Convert the UTF-8 array to a string representation
  const utf8EncodedString = String.fromCharCode(...utf8Array);
  return utf8EncodedString;

}

// Decode a UTF-8 byte array to a stirng
export function decodeUTF8(bytes: Uint8Array): string {
  const utf8Decoder = new TextDecoder("utf-8");
  return utf8Decoder.decode(bytes);
}

export default Client;
