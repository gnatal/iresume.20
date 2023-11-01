export const template3style = `
<style>
body {
    margin: 0px;
}

.layout {
    display: grid;
    position: relative;
    grid-template-areas: "profile data";
    grid-gap: 0;
}

.profile-section {
    position: sticky;
    top: 0px;
    left: 0px;
    grid-area: profile;
    width: 25vw;
    height: 100vh;
    background: #22AAFF;
}

.data-section {
    grid-area: data;
    width: 70vw;
}

.profile-image-box {
    width: 100%;
    text-align: center;
}

.profile-image {
    width: 15vw;
    max-height: 15vw;
    border-radius: 50%;
    margin: 20px auto;
    object-fit: cover;
}

.profile-data {
    display: block;
    margin: 20px auto;
}

.profile-text {
    margin-left: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 1.5rem;
    font-family: "Gill Sans" sans-serif;
    font-weight: bold;
    text-decoration: underline;
    padding: 5px;
}

.skills {
    margin-top: 40px;
    display: block;
    text-align: left;
    margin-left: 20px;
}

.skill {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-top: 10px;
    position: relative;
}

.skill-label {
    text-align: left;
    font-size: 1.25rem;
    margin-right: 10px;
    margin-left: 10px;
}

.skill-bar {
    width: 10vw;
    height: 10px;
    position: absolute;
    right: 20px;
    background-color: #eee;
    border-radius: 5px;
    display: inline-block;
}

.skill-level {
    height: 100%;
    border-radius: 5px;
    background-color: #333;
    width: 50%;
}

.section-header {
    font-size: 1.5rem;
}

.education-title {
    font-size: 1.25rem;
}

.education-container {
    margin: 10px;
}

.education-grid {
    border-bottom: 2px solid #ccc;
}

@media (max-width: 572px) {

    .layout {
        display: grid;
        position: relative;
        grid-template-areas: "profile"
            "data";
        grid-gap: 0;
    }

    .profile-section {
        position: relative;
        top: 0px;
        left: 0px;
        grid-area: profile;
        width: 100vw;
        overflow-y: scroll;
        background: #22AAFF;
    }

    .profile-image-box {
        width: 100%;
        text-align: center;
    }

    .profile-image {
        width: 200px;   
        max-height: 200px;
        border-radius: 50%;
        margin: 20px auto;
        object-fit: cover;
    }

    .skill-bar {
        width: 60vw;
    }

    .skill

    .section-header {
        margin-left: 10px;
    }

    .data-section {
        width: 100vw;
    }


}
</style>


`;
