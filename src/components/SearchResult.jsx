export const SearchResult = ({ result, play, chooseSong, action }) => {
    return (
        <div
            className="result">
            <img
                onClick={() => play(result)}
                src={result.album.images[0].url}
                height="40"
                alt=""
            />
            <div id="name-artist">
                <p id="name">{result.name}</p>
                <div id='artists'>
                    {result.artists.map(artist => artist.name).join(', ')}
                </div>
            </div>
            <div onClick={(e) => { chooseSong(e, result) }} className='add-song'>
                {action}
            </div>
        </div>
    )
}