import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes } from "react-router";
import Index from "./pages";

import UnixTime from "./plugins/unix-time";
import UnixTimeIcon from "@mui/icons-material/AccessTime";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface Plugin {
    id: string;
    name: string;
    icon: React.ReactNode;
    content: () => Promise<{ default: React.ComponentType }>;
}

export const plugins: Plugin[] = [
    {
        id: "unix-time",
        name: "Unix Time Converter",
        icon: <UnixTimeIcon />,
        content: async () => ({ default: UnixTime })
    },
]

function render() {
    ReactDOM.render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <React.Suspense fallback="foo">
                <MemoryRouter initialEntries={[`/${plugins[0].id}`]}>
                    <Routes>
                        <Route path="/" element={<Index />}>
                            {plugins.map(plugin => {
                                const Component = React.lazy(plugin.content);
                                return <Route key={plugin.id} path={plugin.id} element={<Component />} />
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
