import { useState } from "react";

interface Props {
    games: string[];
    listTitle: string;
}

function ListGroup({games, listTitle}: Props) {
    const [selected, updateSelected] = useState(-1);

    return (
        <>
            <h1>{listTitle}</h1>
            <ul className="list-group">
                {games.map((item, index) =>
                    <li
                    key={item}
                    className={`list-group-item${index === selected ? " active" : ""}`}
                    onClick={() => updateSelected(index)}
                    >
                        {item}
                    </li>
                )}
            </ul>
        </>
    );
}

export default ListGroup;






















/*
https://rule34.xxx/index.php?page=favorites&s=view&id=3411042

let img_list = document.getElementsByClassName("image-list")[0]; 
const hasProps = (obj, props) => {
 for (let i = 0; i < props.length; i+=1) {
     if (props[i] in obj && !!obj[props[i]][0]) {obj = obj[props[i]][0]}
     else { return false; }
 }
 return true;
}

const isImg = (img) => hasProps(img, ["children", "children", "id"])

const imgs = () => {
    let images = [];
    for (let i = 1; i < img_list.children.length; i+=2) {
        if (isImg(img_list.children[i])) {
            images.push(img_list.children[i]);
        }
    }
    return images;
}

const id = (obj) => parseInt(obj.children[0].children[0].id.substring(1))

const tags = (obj) => posts[id(obj)].tags

// tags(imgs()[0]) gives tags of first thing

const imgfilter = (terms) => {
    let filtered = []
    for (let i = 1; i < img_list.children.length; i+=2) {
        if (isImg(img_list.children[i]) && id(img_list.children[i])
        && terms.every(item => tags(img_list.children[i]).includes(item))) {
            filtered.push(img_list.children[i]);
            filtered.push(img_list.children[i+1]);
        }
    }
    return filtered;
}

const search = (ele) => {
    if (event.key !== 'Enter') { return; }

    const show = imgfilter(searched.value.split(" "));
    console.log(show);
    // img_list.innerHTML = img_list.children[0];

    for (let key in img_list.children) {
        if (img_list.children.hasOwnProperty(key)) {
            img_list.children[key].style.display = "none";
        }
    }

    show.forEach((img) => {
        // img_list.innerHTML += img;
        img.style.display = "block";
    });
}

const r34content = document.getElementById("content")
r34content.innerHTML = "<input type='text' placeholder='Search up some baddies' id='searched-tags' onkeydown='search(this)'>" + r34content.innerHTML

let searched = document.getElementById("searched-tags")
*/


/*



const img_list = document.getElementsByClassName("image-list")[0];

const hasProps = (obj, props) => {
    for (let i = 0; i < props.length; i++) {
        if (props[i] in obj && obj[props[i]][0]) {
            obj = obj[props[i]][0];
        } else {
            return false;
        }
    }
    return true;
};

const isImg = (img) => hasProps(img, ["children", "children", "id"]);

const id = (obj) => parseInt(obj.children[0].children[0].id.substring(1));
const tags = (obj) => posts[id(obj)].tags;

const imgfilter = (terms) => {
    let filtered = [];
    for (let i = 1; i < img_list.children.length; i += 2) {
        const img = img_list.children[i];
        if (
            isImg(img) &&
            id(img) &&
            terms.every((term) => tags(img).includes(term))
        ) {
            filtered.push(img);
            filtered.push(img_list.children[i + 1]); // assumes next sibling is related
        }
    }
    return filtered;
};

const search = (event) => {
    if (event.key !== "Enter") return;

    const terms = searched.value.trim().split(/\s+/);
    const show = imgfilter(terms);

    // Hide everything first
    for (let i = 0; i < img_list.children.length; i++) {
        img_list.children[i].style.display = "none";
    }

    // Show only filtered results
    show.forEach((img) => {
        img.style.display = "block";
    });
};

// Add search input to the page
const content = document.getElementById("content");
content.insertAdjacentHTML(
    "afterbegin",
    `<input type="text" placeholder="Search up some baddies" id="searched-tags">`
);

const searched = document.getElementById("searched-tags");
searched.addEventListener("keydown", search);





*/