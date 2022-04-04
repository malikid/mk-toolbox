import {useState} from 'react'
import Head from 'next/head'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { css, cx } from '@emotion/css'

export default function GetFundaFloorPlan() {

  const [isLoading, setIsLoading] = useState(false);

  const downloadFml = (name, fmlText) => {
    const filename = `${name.replace(' ', '_').toLowerCase()}_floorplan.fml`;
    const pom = document.createElement('a');
    const bb = new Blob([fmlText], {type: 'text/plain'});

    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');

    pom.click();
  }

  const submitUrl = async event => {
    event.preventDefault()
    setIsLoading(true)

    const res = await fetch(
      '/api/funda-fml',
      {
        body: JSON.stringify({
          url: event.target.url.value
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }
    )

    const result = await res.json()

    setIsLoading(false)

    if(res.status !== 200) {
      alert(result.error)
      return
    }

    const {name, fml} = result
    downloadFml(name, fml)
  }

  return (
    <div className={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20vh;
    `}>
      <Head>
        <title>Download Funda Floor Plan</title>
        <meta name="description" content="Get floor plans from funda" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <h3>Warning: There is no floor plan available for sold properties!</h3>
      <h1>Enter the available / under offer property url</h1>
      <form onSubmit={submitUrl} className={css`
        display: flex;
        flex-direction: row;
        gap: 20px;
      `}>
        <TextField
          id="url"
          type="url"
          variant="standard"
          size="large"
          required
          className={css`
            width: 250px;
          `}
        />
        <LoadingButton
          loading={isLoading}
          loadingIndicator="Reaching..."
          variant="outlined"
          type="submit"
          size="medium"
        >
          Reach!
        </LoadingButton>
      </form>
      <h3>
        <a href="https:\/\/floorplanner.com">Go to FloorPlanner</a> and import the floor plan!
      </h3>
      {isLoading &&
        <Stack sx={{ width: '80%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>
      }
    </div>
  )
}
