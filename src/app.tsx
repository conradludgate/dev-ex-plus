import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes } from "react-router";
import Index from "./pages";

import UnixTimeIcon from "@mui/icons-material/AccessTime";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import UnixTime from "./plugins/unix-time";
import JSONFormat from "./plugins/json-format";

interface Plugin {
    name: string;
    icon: React.ReactNode;
    content: () => Promise<{ default: React.ComponentType }>;
}

export const plugins: Record<string, Plugin> = {
    "unix-time": {
        name: "Unix Time Converter",
        icon: <UnixTimeIcon />,
        content: async () => ({ default: UnixTime })
    },
    "json-format": {
        name: "JSON Format/Validate",
        icon: null,
        content: async () => ({ default: JSONFormat })
    }
}

function render() {
    ReactDOM.render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <React.Suspense fallback="foo">
                <MemoryRouter initialEntries={[`/unix-time`]}>
                    <Routes>
                        <Route path="/" element={<Index />}>
                            {Object.entries(plugins).map(([key, plugin]) => {
                                const Component = React.lazy(plugin.content);
                                return <Route key={key} path={key} element={<Component />} />
                            })}
                        </Route>
                    </Routes>
                </MemoryRouter>
            </React.Suspense>
        </LocalizationProvider >,
        document.getElementById("root")
    );
}

render();
