import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Editor } from "slate-react";
import { initialValue } from "./slateInitialValue";
import Mitt from "mitt";

interface Props {

}

const emitter = Mitt();

export const SyncingEditor: React.FC<Props> = () => {
    const [value, setValue] = useState(initialValue);
    const editor = useRef<Editor | null>(null);
    const id = useRef(`${Date.now()}`);
    //const remote = useRef(null);

    useEffect(() => {
        emitter.on("*", (type) => {
            if(id.current !== type) {
                console.log("Change has happened in other editor")
            }
        })
    }, []);

    return (
        <Editor
            ref={editor} 
            value={value}  
            onChange={(opts) => {
                setValue(opts.value)

                const ops = opts.operations
                    .filter(o => {
                        if(o) {
                            return (
                                o.type !== "set_selection" &&
                                o.type !== "set_value" &&
                                (!o.data || !o.data.has("source"))
                            );
                        }

                        return false;
                    })
                    .toJS()
                    .map((o: any) => ({...o, data: { source: "one" }}));

                if(ops.length) {
                    emitter.emit(id.current, ops);
                }
            }} 
        />
    )
}