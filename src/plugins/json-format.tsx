import { Alert, Grid, Snackbar, TextField } from '@mui/material';
import { Box } from '@mui/system';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ReactElement, useEffect, useState } from 'react';
import  {JSONPath} from 'jsonpath-plus';

export default function JSONFormat(): ReactElement {
    const [code, setCode] = useState("");
    const [jpath, setJPath] = useState("$");
    const [obj, setObj] = useState({});
    const [format, setFormat] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const obj = JSON.parse(code);
            setObj(obj)
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }, [code, jpath]);

    useEffect(() => {
        const ext = jpath ? JSONPath({json: obj, path: jpath}) : obj;
        setFormat(JSON.stringify(ext, null, 2));
    }, [code, jpath]);

    return <Box sx={{ height: 0.98 }} >
        <Grid container sx={{ height: 0.95 }} spacing={4}>
            <Grid item xl={6} lg={12}>
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
                        height: "100%",
                    }}
                />
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
                    <Alert variant="filled" severity="error" onClose={() => setError("")}>{error}</Alert>
                </Snackbar>
            </Grid>
            <Grid item xl={6} lg={12}>
                <CodeEditor
                    value={format}
                    language="json"
                    placeholder={`{\n  "please": "put unformated JSON here"\n}`}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        height: "100%",
                    }}
                />
            </Grid>
        </Grid>
        <TextField
            value={jpath}
            onChange={e => setJPath(e.target.value)}
        />
    </Box>
}
