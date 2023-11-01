export const template1Style = `
<style>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f2f2f2;
}

.education-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding-bottom: 20px;
}

.education-course {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1.25rem;
  font-weight: bold;
}

.education-dates {
  font-size: 0.875rem;
  font-weight: lighter;
}

.educaation-description {
  font-size: 1rem;
}

.section {
  width: 100%;
  display: flex;
  display: -webkit-box;
  margin-bottom: 30px;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-section {
  display: flex;
  display: -webkit-box;
  margin-bottom: 30px;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.experience-section {
    width: 95vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

.education-section {
    width: 95vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  }

  .section-skills {
    width: 95vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }


.profile-pic {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skills {
  margin-top: 20px;
  margin-left: 40px;
}

.skill {
  margin-bottom: 10px;
}

.skill-label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}


.profile-data {
  margin-left: 20px;
}

.section-header {
  margin-left: 10px;
  width: 100px;
  font-size: 18px;
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

.task-list {
  margin-top: 10px;
}

@media (max-width: 576px) {

  body {
    overflow-x: hidden;
  }

  .profile-section {
    width: 90vw;
    margin: 10px auto;
    display: grid;
    grid-template-columns: 1fr;

  }

  .profile-pic {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    margin: 10px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    text-align: center;
  }

  .profile-data {
    font-size: 1rem;
    margin-left: 0px;
  }

  .title {
    display: none;
    font-weight: bold;
  }

  .education-section {
    width: 90vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  }

  .education-title {

  }

.education-container {
  display: grid;   
  text-align: left; 
  margin:10px ;
  padding-bottom: 0px;
}

.education-course {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1.25rem;
  font-weight: bold;
}

.education-dates {
  font-size: 0.875rem;
  font-weight: lighter;
}

.educaation-description {
  font-size: 1rem;
}


  .section-skills {
    width: 90vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .experience-section {
    width: 90vw;
    display: grid;
    margin: 10px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    width: 100px;
    font-size: 18px;
  }

}
</style>

`