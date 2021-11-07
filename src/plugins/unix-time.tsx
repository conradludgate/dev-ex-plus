import { DateTimePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

export default function UnixTime(): ReactElement {
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState("");

    const props = (t: string) => ({
        date,
        type,
        setDate: (date: Date) => {
            if (date.getTime() == date.getTime()) {
                setDate(date);
                return false;
            } else {
                return true;
            }
        },
        recordType: () => { setType(t) }
    });

    return <Grid container spacing={2}>
        <Unix {...props("unix")} />
        <DateTime {...props("datetime")} />
        <ISO8601 {...props("iso-8601")} />
    </Grid>
}

interface Props {
    date: Date,
    type: string,
    setDate: (date: Date) => boolean,
    recordType: () => void,
}

function Unix({ date, type, setDate, recordType }: Props): ReactElement {
    const [time, setTime] = useState(() => Math.floor(+date / 1000).toString());
    const [error, setError] = useState(false)

    useEffect(() => {
        if (type === "unix") {
            setError(setDate(new Date(1000 * +time)));
        }
    }, [time])

    useEffect(() => {
        if (type !== "unix") {
            setTime(Math.floor(+date / 1000).toString())
        }
    }, [date, type])

    return <Grid item xs="auto">
        <TextField
            error={error}
            value={time}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={e => { recordType(); setTime(e.target.value); }}
            label="Unix Timestamp"
        />
    </Grid>
}

function DateTime({ date, setDate, recordType }: Props): ReactElement {
    return <Grid item xs="auto">
        <DateTimePicker
            label="Date Time"
            renderInput={(props) => <TextField {...props} />}
            value={date}
            onChange={e => { recordType(); setDate(e); }}
        />
    </Grid>
}

function ISO8601({ date, type, setDate, recordType }: Props): ReactElement {
    const [time, setTime] = useState(() => date.toISOString());
    const [error, setError] = useState(false)

    useEffect(() => {
        if (type === "iso-8601") {
            setError(setDate(new Date(time)));
        }
    }, [time])

    useEffect(() => {
        if (type !== "iso-8601") {
            setTime(date.toISOString())
        }
    }, [date, type])

    return <Grid item xs={2}>
        <TextField
            error={error}
            value={time}
            onChange={e => { recordType(); setTime(e.target.value); }}
            label="ISO-8601"
            fullWidth
        />
    </Grid>
}
