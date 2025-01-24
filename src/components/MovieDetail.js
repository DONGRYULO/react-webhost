

function MovieDetail({title, imgsrc}) {
    return (
        <div>
            <h1>{title}</h1>
            <img src={imgsrc} />
        </div>
    );
}

export default MovieDetail;