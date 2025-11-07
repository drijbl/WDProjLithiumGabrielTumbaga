# Chemivis Element Outline

This markdown file contains the descriptions of each page and the elements that should appear in them. It serves as an **element outline** to make sure the whole team is aligned when designing and implementing the website.

## Home Page: *Welcome to Chemivis*
- On start-up, the page displays a **full-screen layout** with the **title** and **subtitle** centered near the top.  
- Background: for now, I was thinking having the gradient for this, unless you can think of anything that will make it more 'Chemistry-like'
- Main visual: a **rotating molecule model**.  
  - When idle, the molecule rotates on its own.  
  - The user can rotate the molecule more using the mouse.  
  - *If that’s not possible*, the molecule will auto-rotate while the **background reacts to mouse movement** instead.  
- A **menu button** appears at the top-left corner. On click, it **pushes the elements on the page to the right** and opens a **pop-up sidebar menu**.  
- Menu layout: a **list of headers and subheaders**. On hover, the text color changes.  

## Interactive Periodic Table: *Explore the Elements*
- Displays a **standard IUPAC periodic table**.  
- Still unsure if a short intro text (explaining what the periodic table is) should appear above it, or if we’ll go straight to the table.  
- On hover: an **element tile enlarges slightly**.  
- On click: a **pop-up window** appears (about 70–100% of the screen).  
  - **Left side:** visual of the **element’s electron orbital**, with moving electrons (similar to Lively Wallpaper's).  
  - **Right side:** the **element’s information** (name, symbol, atomic number, etc.).

## Subatomic Particles: *Inside the Atom*
- Starts with a **short discussion/introduction**, though I still need ideas for an engaging header so it doesn’t look like a plain article.  
- There's going to be an atom model where users can click on protons, electrons, and neutrons to find pop-ups with information about them. 
- Includes a **“History of the Atomic Model” timeline**. I was thinking that this section would be a vertical timeline with the different models and brief explanations.

## VSEPR Theory: *Geometry with Molecules*
- Begins with a **brief discussion** of VSEPR theory before moving to the simulation.  
- There will be a **simulation box** that allows users to select the number of bonds and lone pairs.  
- A **rotating molecular geometry model** is shown by default, updating whenever the user changes the inputs.  
- The model continues to rotate as shapes change.

## Balancing Chemical Equations: *Conserving Atoms Through Balance*
- Starts with a **short discussion** on balancing equations.  
- Followed by a **simulation** that balances equations while visually showing the number of atoms/molecules.
  - Not sure if it should be like an actual equation balancer (may sample websites online) or select equations lang
- Visuals show molecules on both sides changing quantities as coefficients are adjusted

## Practice Games
- Contains **tiles for multiple chemistry mini-games**, such as:
  - **Polyatomic Ions**
  - **Transition Metal Charges**
  - **VSEPR Geometry Challenge** (see chemquiz.net)
