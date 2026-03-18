# Chemivis 

## FINAL MODIFICATION PROPOSAL
For the final modification of our website, we will apply the Create, Read, Update, and Delete (CRUD) processes by modifying one of our main webpages, the Practice Games page. This page will be redesigned to incorporate CRUD processes for managing user data, such as profile information and game records.

### Login/Sign-up Form
In the Practice Games page, users will be greeted by a login pop-up upon entry. There will also be an option to sign up for users who do not yet have an account.
- For users signing in, they will input their login details into an HTML form. In this process, CRUD is applied through the **Read** operation, as data stored in localStorage is retrieved and cross-referenced with the username and password entered by the user. If the credentials match, the user will be allowed to proceed to the games. Otherwise, the system will display a message indicating that the details they entered are incorrect.
- On the other hand, users who wish to sign up can click on the sign-up option, which will redirect them to another pop-up. Here, they will be prompted to input a username and password. CRUD is applied in multiple ways in this segment. The **Create** operation is used to store a new username-password pair in localStorage based on the user’s input. Furthermore, the **Read** operation is used to verify whether the chosen username already exists in the stored data. Once the user successfully signs up with a valid and unique username, they will then proceed to the games.

In the actual games webpage, the games will be displayed in a revised layout, with the addition of a _personal records section_ and a _profile redirect icon_ at the top right corner. 

### Profile Button
For the profile button, when users click it, a pop-up will appear displaying their username, display name (which is set to their username by default), and password, along with a button that allows them to change their display name or password. When this button is clicked, the user will be prompted with an HTML form where they can input a new display name or password, depending on their selection. At the bottom of the pop-up, there will also be a red “Delete Account” button, which users can click to permanently remove their account.

In this feature, CRUD is applied through multiple operations. The **Read** operation is used to retrieve and display the user’s current information. The **Update** operation is applied when the user edits their display name or password, as the system modifies the existing data stored in localStorage and saves the updated values. Additionally, the **Delete** operation is used when the user clicks the “Delete Account” button, which removes the user’s data from localStorage.

### Personal Records
For the personal records section, it will display the user’s best performance in each game. Each time a user completes a game, their score will be saved and compared with their existing record for that specific game. If the new score exceeds the previous best, the stored value will be updated accordingly.

This feature primarily applies the **Read** and **Update** operations of CRUD. The **Read** operation is used to retrieve the user’s stored records from localStorage and display them in the interface. The **Update** operation is used when a new score surpasses the previous record, prompting the system to replace the old value with the new one. Additionally, a **Create** operation may occur when initializing a new user’s record data if none exists yet.

### WIREFRAMES
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b5536794-cfc4-49c2-b5af-76176420b922" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e4743286-0b32-4bdc-9aae-489836b23dd3" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0c024aac-5350-4471-95f4-89374bb0060c" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ae0d2723-8433-4125-b3be-6ce03d30bfcd" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0d297839-fbab-4c5a-8716-10deb4c3827a" />

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Visualizing the unseen fundamentals of chemistry
Chemistry is the study of matter, which is made up of atoms and molecules that form everything around us. Yet these particles are invisible to the naked eye, making them difficult to imagine and understand. **Chemivis** bridges this gap by bringing the unseen world of chemistry to life through interactive visualizations and simulations. It helps learners visualize abstract chemistry concepts easier, while also teaching them all about the fundamental topics of the subject!

## Logo
<img width="813" height="457" alt="image" src="https://github.com/user-attachments/assets/4f3a08f1-c6b9-4aad-ab3f-2788b63f2901" />

### Website Outline

**Home Page**: _Welcome to Chemivis_
> This is the main page of our website. It features the website's title and subtitle, an animated background with moving molecules, our logo, navigation links to all other pages, and a short introduction paragraph explaining the purpose of our website. It will also include a footer with our names and credits to all references we will use.
<br>
Normal: <br> <img width="753" height="422" alt="Home Page Normal" src="https://github.com/user-attachments/assets/8dbf7e46-139e-4163-8344-781d27d62b21" /> <br>
Expanded: <br> <img width="755" height="419" alt="Home Page Expanded" src="https://github.com/user-attachments/assets/fe197e55-405b-4cf8-a235-5e1be6379285" />

**Interactive Periodic Table**: _Explore the Elements_
> This page displays an interactive periodic table where users can click on any element to view more detailed information not shown in the regular periodic table. A visual atomic model or ring diagram will appear with the pop-up, visualizing the protons and electrons each element has.
<br>
Normal: <br> <img width="754" height="424" alt="image" src="https://github.com/user-attachments/assets/61d43655-8f85-4772-8be4-7c0d0767d836" /> <br>
Expanded: <br> <img width="754" height="425" alt="image" src="https://github.com/user-attachments/assets/0a74d8ee-1a93-4b4a-bd8c-a4b3b9b9a785" /> <br>

**Subatomic Particles**: _Inside the Atom_
> This section focuses on the fundamental particles that make up atoms: protons, neutrons, and electrons. It features a short discussion on them, interactive animations showing how these particles are arranged, and a timeline of the history of atomic models. Visual models will be in place to show how these concepts were improved upon the previous ones.
> <img width="755" height="425" alt="image" src="https://github.com/user-attachments/assets/7d0b608d-c66c-40fb-9d24-9efcdd8d0993" />

**VSEPR Theory**: _Geometry with Molecules_
> This page discusses the Valence Shell Electron Pair Repulsion (VSEPR) theory, which explains how molecules can have different shapes based on their structures. Here, there will be a discussion on the lesson and an interactive simulation box where users can modify the structure of molecules to update a 3D molecular model in real time to show the resulting shape.
> <img width="751" height="421" alt="image" src="https://github.com/user-attachments/assets/3954718e-11af-486a-9d91-10b7f5ab2dfd" />

**Balancing Chemical Equations**: _Conserving Atoms Through Balance_
> This page explains the law of conservation of mass and how it applies to balancing chemical equations. An interactive visualizer shows different equations where molecules on both sides of the equation change in number as coefficients change. This makes it easier to see how the numerical equations correspond to real atoms and molecules.
> <img width="753" height="422" alt="image" src="https://github.com/user-attachments/assets/c3bac5a5-5170-4985-addb-6463bc9c9b9d" />

**Practice Games**
> This section compiles short, interactive chemistry games that reinforce learning. These activities will generally be about basic inorganic chemistry topics, such as nomenclature, identifying ions, and matching formulas to names. These games serve as fun ways to review the concepts covered in the previous pages, as well as other lessons users might come across while studying chemistry.
><img width="754" height="423" alt="image" src="https://github.com/user-attachments/assets/ba3cf891-4fad-4ff6-b307-d72f461ad796" />

**Project Proposal Update (3rd Quarter)**
### HTML Forms
> The HTML forms will be used in the Practice Games section for answer submission and session tracking. In the Polyatomic Ions and Transition Metals games, users input game answers through forms, which JS verifies to award points (scoring is discussed in the website additions) or deduct lives. At the start of each session, users enter a username via a form, which serves as a session identifier. The final score is then recorded under that username, with the highest scores displayed on a session-based leaderboard. 
<br><br> Username Input: <br> <img width="753" height="422" alt="image" src="https://github.com/user-attachments/assets/9b785ff2-e6dc-4daa-bd11-2139b47e4a21" /> <br>

> User-input answer: <br> <img width="753" height="422" alt="image" src="https://github.com/user-attachments/assets/f1e87388-de35-4bd9-8f02-39cb2aad1ca0" />
 <br>

> Game Over: <br> <img width="753" height="422" alt="image" src="https://github.com/user-attachments/assets/81b6adc3-e19b-4f81-9ee3-9de1a411a144" /> <br>

### New Additions to the Website
**Main Game:** *Master Alchemy* <br>
> Aside from HTML forms and applications, we plan to add another game by modifying our home page. The additional game, called “Master Alchemy,” is the main game featured on the Practice Games page. Inspired by local arcade-style games, Master Alchemy challenges players to defeat their opponent by combining common elements into chemical compounds. The damage dealt is based on the compound’s reactivity, while certain elements can be used to heal.
> <img width="639" height="360" alt="image" src="https://github.com/user-attachments/assets/2807e221-f6ec-4415-bd35-dc4da4726f59" />
> <img width="637" height="361" alt="image" src="https://github.com/user-attachments/assets/421ef164-4c3c-4561-b7ef-87c23fabe794" />

**Home Page Revisions** <br>
> Our home page will be enhanced with additional animations and interactive features. It will be divided into three stages. The first stage will display the website title with animated and exploding atoms in the background. Upon clicking the “Next” button, users will be directed to the second stage, which features the website subtitle with the interactive molecule appearing along the side. Clicking “Next” one last time would lead to the final stage of the home page, where the website title is centered and surrounded by icons that represents the different pages of the site.
> <br><br> 1st stage: <br> <img width="640" height="358" alt="image" src="https://github.com/user-attachments/assets/400365bb-f23f-4839-a918-54069f8c6d0d" /> <br>
> 2nd stage: <br> <img width="636" height="361" alt="image" src="https://github.com/user-attachments/assets/8430daba-2bf3-4b49-81e1-1c7ab4a64355" /> <br>
> 3rd stage: <br> <img width="639" height="358" alt="image" src="https://github.com/user-attachments/assets/d6c112cf-d204-42fa-aa2b-b6309d84edd8" /> <br>

### JS Implementation ##
JavaScript will power most of the interactive features of Chemivis, making static visuals respond to user actions across the website.
- **Interactive Periodic Table:** JS will trigger pop-ups displaying detailed element information and atomic models when a user clicks on an element.
- **Subatomic Particles:** JS will allow users to interact with the atomic model by clicking specific parts to reveal informative pop-ups about subatomic particles.
- **VSEPR Theory:** JS will manage the molecular shape simulation, updating 3D models based on the atomic structure details selected by a user.
- **Balancing Chemical Equations:** JS will dynamically balance chemical equations, updating the visual models from the values in those equations.
- **Practice Games:** JS will handle game logic, including questions, answers, scoring, and feedback to create an interactive learning experience.

Overall, JS will make Chemivis' visualizations less static and more interactive for users.
