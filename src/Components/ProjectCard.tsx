import "/src/App.css";

interface Props {
    title: string;
    img: string;
    genres: string[];
    link: string;
    bgColor?: string;
    darkText?: boolean;
    pixelArt?: boolean;
}

function ProjectCard({ title, img, genres = [], link, bgColor, darkText, pixelArt }: Props) {
    if (bgColor) {
        bgColor = bgColor.substring(0, bgColor.indexOf(")")) + ', 0.532)'
    }

    let textColor = darkText ? "black" : "white";

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-card">
            <img src={img} alt={title} className="project-image" style={pixelArt ? { imageRendering: "pixelated" } : undefined}/>
            <div className="project-info" style={{ backgroundColor: bgColor, color: textColor }}>
                <h3 className="project-title">{title}</h3>
                <p className="project-genres">{genres.join(', ')}</p>
            </div>
        </a>
    );
}

export default ProjectCard;
