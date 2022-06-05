import React, {useEffect, useRef, useState} from "react";
import {Editor} from 'slate-react';
import { initialValue } from "./slateInitialValue";
import Mitt from 'mitt';

interface Props {

}

const emitter = Mitt();

export const EditorSync: React.FC<Props> = () => {

    const [value, setValue] = useState(initialValue);
    const editor = useRef<Editor | null>(null);
    //const remote = useRef(false);

    useEffect(() => {
        emitter.on("*", () => {
            console.log("change happened")
        })
    }, []);

    return (
        <Editor 
            ref={editor}
            value={value}
            onChange={opts => {
                setValue(opts.value)
                console.log("operation")
                const ops = opts.operations
                    .filter(o => {
                        if (o) {
                            return (
                                o.type !== "set_selection" &&
                                o.type !== "set_value" &&
                                (!o.data || !o.data.has("source"))
                            );
                        }

                        return false;
                    })
                    .toJS()
                    .map((o: any) => ({ ...o, data: { source: "one" } }));

                if (ops.length) {
                    emitter.emit("something", ops);
                }
            }}
        />
    )
}