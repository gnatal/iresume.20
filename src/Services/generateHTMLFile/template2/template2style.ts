export const template2Style = `
<style>
body {
    margin: 0px;
    overflow-x: hidden;
}

.profile-section {
    display: grid;
    grid-template-areas: "profile-data profile-data image";
    margin: 0px;
    padding: 0px;
    height: 50vh;
    width: 100vw;
    background: linear-gradient(#CF9FAF 0%, #923cb5 100%);
}

.profile-image {
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    grid-area: image;
    object-fit: cover;
}

.profile-data {
    grid-area: profile-data;
    color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-text {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: Cursive;
}

.section-header {
    width: 100%;
    font-family: Cursive;
    text-align: left;
    padding-left: 20px;
    font-size: 2rem;
    margin-top: 0px;
    color: #2F2F2F;
    padding-top: 10px;
}

.education {
    background: #FFFFFF;
    width: 100vw;
}

.education-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin: 10px;
}

.education-container {
    width: 100%;
    border-radius: 20px;
    border: solid 1px #ccc;
    box-sizing: border-box;
    padding: 10px;
}

.experience {
    background: #FFFFFF;
    width: 100vw;
}

.skills {
    margin-top: 20px;
}

.skill {
    margin-bottom: 10px;
}

.skill-label {
    display: inline-block;
    width: 100px;
    font-weight: bold;
}

.skill-bar {
    width: 200px;
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
}

.skill-level {
    height: 100%;
    border-radius: 5px;
    background-color: #555;
}


.languages {
    background: #FFFFFF;

}

.education-section {
    padding-top: 10px;
    padding-bottom: 10px;
}

.education-title {
    font-size: 1.25rem;
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 5px;
}


.education-dates {
    display: inline-block;
    font-size: 0.875rem;
    color: #888;
    margin-left: 20px;
}

.education-description {
    font-weight: normal;
    font-size: 1rem;
    padding-bottom: 20px;
    margin-top: 10px;
}

.section-skills {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}


@media (max-width: 578px) {
    .profile-section {
        grid-template-areas: "image"
            "profile-data";
        height: 100vh;
        text-align: center;
    }

    .profile-data {
        display: block;
        width: 90vw;
        margin: 10px auto;
    }

    .profile-text {
        font-family: Fantasy;

        font-size: 1rem;
        font-weight: semi-bold;
        margin: 10px auto;
        padding: 5px;
        border-radius: 20px;
        width: 90%;
        border: 1px solid #ccc;
    }

    .education-grid {
        grid-template-columns: 1fr;
    }

    .education-container {
        width: 90%;
        margin: 10px auto;
    }


    .education-dates {
        margin-left: 10px;
    }

    .section-skills {
        width: 90%;
        grid-template-columns: 1fr;

    }

    .skill-bar {
        width: 150px;
        height: 10px;
        background-color: #ccc;
        border-radius: 5px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
    }


}
</style>


`