import { useEffect, useState, type FormEvent } from "react";

function CFlatPlayground() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [wasmReady, setWasmReady] = useState(false);
    const [compile, setCompile] = useState<((src: string, mode: string) => string) | null>(null);

    useEffect(() => {
        import("./wasm/pkg/cflat_wasm").then((module) => {
            module.default().then(() => {
                setCompile(() => module.compile_cflat);
                setWasmReady(true);
                console.log("CFlat WASM module initialized.");
            });
        });
    }, []);

    function showCompiled(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!wasmReady || !compile) {
            setOutputText("Wasm loading...");
            return;
        }

        const mode = "asm";
        try {
            const output = compile(inputText, mode);
            setOutputText(output);
        }
        catch (err) {
            console.error("Compilation failed:", err);
            setOutputText("Compilation error: " + err);
        }
    }
    
    return (
        <div className="compiler-display">
            <form onSubmit={showCompiled}>
                <label htmlFor="cflat-input">Input CFlat Code Here</label>
                <br />
                <textarea
                id="cflat-input"
                name="cflat-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                cols={50}
                />
                <br />
                <button type="submit">Compile</button>
            </form>

            <div id="cflat-output" style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#111", color: "#0f0", padding: "1rem" }}>
                {outputText}
            </div>
        </div>);
}

export default CFlatPlayground;
