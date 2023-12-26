import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './SQLDisplayComponent.css';

interface SQLString {
    text: string;
}

const SQLDisplayComponent: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [data, setData] = useState<SQLString>({ text: "" });

    const fetchData = async () => {
        if (!input) return; // Don't fetch if input is empty

        try {
            const response = await fetch(`https://localhost:7047/OpenAi/GetTest?text=${input}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseSQL = await response.text();
            setData({ text: responseSQL });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    return (
        <div className="container" >
            <h1 style={{ paddingBottom: '200px' }}>WELCOME</h1>
            <div className="bottom-padding">
                <TextField
                    helperText="Enter SQL Request"
                    className="center"
                    required
                    id="outlined-required"
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div>
                <Button
                    className="center"
                    variant="contained"
                    color="primary"
                    onClick={fetchData}
                >
                    Fetch Data
                </Button>
                {data?.text ? <div>{data.text}</div> : <div></div>}
            </div>
        </div>
    );
};


export default SQLDisplayComponent;