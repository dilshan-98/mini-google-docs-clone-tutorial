import React from "react";
import { useState } from "react";
import { Editor } from "slate-react";
import { initialValue } from "./slateInitialValue";

interface Props {

}

export const SyncingEditor: React.FC<Props> = () => {
    const [value, setValue] = useState(initialValue);

    return <Editor value={value} onChange={(opts) => setValue(opts.value)} />
}