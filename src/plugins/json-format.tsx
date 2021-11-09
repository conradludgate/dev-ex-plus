import { Alert, Snackbar, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { JSONPath } from 'jsonpath-plus';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Split from '@uiw/react-split';
import JsonViewer from 'react-json-view';

export default function JSONFormat(): ReactElement {
    const [code, setCode] = useState("");
    const [jpath, setJPath] = useState("");
    const [obj, setObj] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const obj = JSON.parse(code);
            setObj(obj)
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }, [code]);

    const ext = useMemo(() => {
        return jpath ? JSONPath({ json: obj, path: jpath }) : obj;
    }, [obj, jpath]);

    const theme = useTheme()
    const eight = theme.spacing(8);

    return <Box sx={{ height: `calc(100% - ${eight})` }} >
        <Split style={{ height: "95%" }}>
            <div style={{ minWidth: 230, width: '45%', position: 'relative' }}>
                <div style={{ overflow: 'auto', height: '100%', boxSizing: 'border-box' }}>
                    <CodeEditor
                        value={code}
                        language="json"
                        placeholder={`{"please": "put unformated JSON here"}`}
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            minHeight: "100%",
                        }}
                    />
                </div>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
                    <Alert variant="filled" severity="error" onClose={() => setError("")}>{error}</Alert>
                </Snackbar>
            </div>

            <div style={{ flex: 1, minWidth: 230, userSelect: 'none', padding: 10, overflow: 'auto' }}>
                <JsonViewer
                    name={false}
                    src={
                        code.length === 0
                            ? { "please": "put unformated JSON here" }
                            : ext
                    }
                    theme="rjv-default"
                />
            </div>
        </Split>
        <TextField
            sx={{ marginTop: 2 }}
            variant="filled"
            size="small"
            label="jsonpath"
            value={jpath}
            onChange={e => setJPath(e.target.value)}
            fullWidth
        />
    </Box>
}
