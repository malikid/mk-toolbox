export default function GetFundaFloorPlan() {

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

    if(res.status !== 200) {
      alert(result.error)
      return
    }

    const {name, fml} = result
    downloadFml(name, fml)
  }

  return (
    <>
      <div>
        <span>Warning: There is no floor plan available for sold properties!</span>
        <form onSubmit={submitUrl}>
          <label htmlFor="url">Enter the available / under offer property url</label>
          <input id="url" type="url" required />
          <button type="submit">Get</button>
        </form>
      </div>
      <div>
        <a href="https:\/\/floorplanner.com">Go to FloorPlanner</a> and import the floor plan!
      </div>
    </>
  )
}
