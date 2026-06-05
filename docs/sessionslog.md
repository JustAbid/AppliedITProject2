# 28/04/2026

## Mohammed Abid Sameer
We learned about agile s/w development, we have 2 methods in agile namely scrum and XP. We also learned how we have been moving from s/w "project" to "product" in industry.


## Mogili Vineeth Reddy

We learned about scrum , product manager and product owner terms and their structures in an organisation , sprints and agile terminology

## Yogesh Chelluboina

We learned about Agile Software Engineering, its practices & Development activities, Key roles in scrum

# 30/04/2026

## Mohammed Abid Ali Sameer
Used git and github to understand workflow, learned the ropes on branching, merging, PR etc, also worked on project vision and updated my part.

## Mogili vineeth Reddy 
Used visual studio code for making changes in the project , learned new keys and shortcuts , hands on merge , pull and push concepts.




# 05/05/2026

## Mohammed Abid Ali Sameer

Added personas, imagined scenarios, made kanban style project timeline scheduler/management.

## Mogili Vineeth Reddy
Used visual studio , added personas , learned how the project process goes and how to make scenarios.

## Yogesh Chelluboina
Learned how to create personas and scenarios to better understand the needs of different users.

## Amarendar Reddy
Learned how to fetch, pull, create branch, commit, and learned about github and visual studio.

## Akash pulluri
Learned about visual studio

# 07/05/2026

## Mohammed Abid Ali Sameer
Today we had a scrum meeting, we discussed our progress, where we currently stand and the future work to complete. The work was completed by the end of the session. We also exchanged our ideas with other groups, we gave and received feedback. One feedback was to add other events if possible such as sports related. For example, marathon event maybe..!
- To answer last 2 questions, User stories were the most useful concept for my project because they helped me clearly understand what the user needs in a simple and structured way. By writing user stories, I was able to focus on the user’s goals and design features that directly solve their problems. This made the system more user-centered and practical.
- Moving to the last question, initially, I assumed that users only need basic features like event listings, but this workshop showed that they also need reminders, easy registration, and personalized suggestions. Writing user stories helped me realize the importance of user convenience and experience. This changed my approach to focus more on user needs rather than just features.

## Mogili Vineeth Reddy

interracted with different teams and known about their project ideas
Nithin - SafestayAI
Deepthi - AIFashionstylist
Lalith - wearitright 

## Yogesh Chelluboina

Today we had a meeting about the Scrum Master role and upcoming project changes. We discussed ideas and scenarios from different groups and exchanged feedback with each other.
Reflection Questions:
1
Scenarios were the most useful concept for my project because they helped me understand how users interact with the system in real-life situations. Instead of just listing features, scenarios allowed me to identify user needs, problems, and possible solutions clearly. This made it easier to design a more user-friendly and practical application.
2
Initially, I assumed that users could easily find environmental events online, but this workshop showed that information is often scattered and not easily accessible. I also realized that users need reminders and personalized suggestions to stay engaged. This changed my approach to focus more on simplicity and user convenience.

# 12/05/2026

## Mohammed Abid Ali Sameer

We had the activity to download and setup VM. I already had VM Box and also Ubuntu. So I proceeded to step 3 which was to setup openssh, establish a connection between host and vm and to transfer files. I had 2 ways:
- Using FileZilla to drag and drop files to send between the host and VM.
- Using SSH connection to securely connect to my VM from my host using powershell or    putty. I tried both ways and created a dummy test.txt file to transfer from host to vm using scp commands. 

The setup is completed, the connection was made,transferring files also worked. 

# 12/05/2026

## Mogili Vineeth Reddy

In this activity, we had to download and set up a Virtual Machine (VM). I downloaded Virtualbox and installed ubuntu. We learned to setup vm and power it on. We had to transfer files.
I tried two different methods to do this:
FileZilla: I used this to easily drag and drop files back and forth between my host and the VM.
SSH Connection: I securely connected to my VM from the host using PowerShell and PuTTY.
To test it out, I created a file called test.txt and successfully transferred it from my host to the VM using scp commands.


# 19/05/2026

## Mohammed Abid Ali Sameer

So today,I installed nginx server, started the server and I made a dummy HTML file, sent it to my Ubuntu from my windows using "scp" command. The server was running perfecty, the index file was loaded and displayed my desired content on my url or the ip address or the server. 

### VPS Provider Research Activity

Next, I researched various VPS providers as part of the class activity. The research focused on comparing hosting providers available in both Germany and India. I explored factors such as pricing, server performance, scalability, storage, support, and suitability for hosting web applications and dashboard systems.

Some of the providers I researched included Hetzner, Contabo, IONOS, Hostinger, DigitalOcean, Vultr, and AWS Lightsail. This activity helped me in understanding different cloud hosting options and identifying suitable VPS solutions for future project deployment and collaborative access.

## Yogesh Chelluboina

Installed the Nginx server and successfully started it on my Ubuntu system. I created a dummy HTML file on my Windows machine and transferred it to Ubuntu using the scp command.

DigitalOcean, Amazon Web Services, and Google Cloud offer reliable VPS solutions with data centres close to India, ensuring good performance and scalability.
Indian providers like Hostinger, BigRock, and HostGator India provide affordable VPS plans with local support.
These VPS services give users dedicated resources such as CPU, RAM, and storage, making them suitable for hosting websites, applications, and databases.
They also offer features like root access, customizable configurations, and high uptime, which are ideal for developers and businesses.

# 21/05/2026

## Mohammed Abid Ali Sameer

In today's hands on lab session, I transitioned our local web infrastructure development from traditional VM resource hosting to a modern, lightweight containerized concpet using Docker. I successfully installed and initialized the Docker Desktop engine on my Windows host machine, navigating initial system subsystem configurations by updating my Windows Subsystem for Linux (WSL 2) kernel backbone. I then created a project folder scheme (C:\docker-webserver\html) containing custom HTML page. I successfully mapped this workspace directly into an isolated Nginx Alpine container image instance using live read only(ro) Bind Mount data volumes to bypass manual production build pipelines. Finally, I also used and understood Docker compose command to run or bring up my container rather than using long docker commands, troubleshooting runtime namespace clashes and strict YAML structural indentation formats along the way.
- I used this command "docker compose logs -f web" to check my logs and I can  make out that service was started or initialized successfully. First, the container boots up by automatically configuring its internal scripts and splitting the workload across eight separate worker engine streams to optimize my CPU performance. Second, it successfully tracks traffic coming from my Windows browser, smartly returning a 304 status code which proves it is using web caching to save network memory instead of reloading unchanged files. Finally, when I turn the server off, it receives a safe shutdown command (SIGQUIT), allowing all internal processes to close their connections gracefully and exit with a perfect success code (code 0) without corrupting any of my files or other files.

## Yogesh Chelluboina

Today, I worked on Docker by running a basic Nginx container and understanding how containerized web servers function. I created a project folder with a custom index.html file and successfully served it using Nginx. After testing the default setup, I stopped the container and implemented a bind mount to link my local project directory with the container. This allowed me to test live reload functionality, where changes in the HTML file were reflected instantly in the running container. I also explored Docker Compose basics to understand how multi-container configurations can be managed efficiently. 

## Amarendar Reddy

Today, I dove into Docker and set up a basic Nginx web server. I started by serving a simple custom HTML page, and then took it a step further by setting up a bind mount. This linked my local project folder directly to the container, giving me instant live updates whenever I changed the code. To wrap things up, I started exploring Docker Compose to see how it simplifies managing multi-container setups.

## Mogili Vineeth Reddy

"Today, I advanced my development workflow by containerizing a web application using Docker and configuring an Nginx web server to manage the deployment. 
I successfully engineered a local development environment that serves a custom static HTML file over a secure HTTPS connection by implementing SSL/TLS encryption and setting up localhost port mapping. 
This containerized architecture allows for seamless local integration testing, ensuring the project can be securely validated and accessed exactly as it would behave in a production environment."

# 26/05/2026

## Mohammed Abid Ali Sameer

Today we had to deliver our mid term presentation. I as part of Group C, did my work, delivered the presentation on time and within the time limit. It went fabulous. The presentation was pretty well delivered, we co-ordinated perfectly even tho we had few hiccups , we were in sync and everything went perfectly fine. Excited for the next seminar :) 


## Mogili Vineeth Reddy

Project Name: EcoConnect

Core Objective: Present the concept and workflow of EcoConnect, an AI-driven platform designed to coordinate community cleaning events, volunteer management, and local environmental initiatives.

Key Achievements:

Problem Defined: Highlighted the logistics gap in organizing community-led environmental cleaning and volunteer mobilization.

Workflow Demonstrated: Showcased how the platform allows users to discover events, track volunteer impact via a user dashboard, and coordinate local cleaning drives.

Technical Architecture: Presented the UI design and discussed AI integration for optimizing event placement and participant matching.

Q&A Defense: Successfully answered feedback from the professor and peers regarding data feasibility, event coordination, and platform scalability.

Key Takeaways:

Mastered the application of technical architectures to community sustainability problems.

Strengthened the ability to communicate technical workflows and user-centered design clearly.

Improved confidence in handling real-time academic feedback and technical Q&As.


#  02-06-2026
## Mogili Vineeth Reddy

*What I Worked On:*

- Built a FastAPI application using the MVC architecture pattern.
- Created Pydantic schemas for task data validation.
- Implemented controller routes using FastAPI APIRouter.
- Added service-layer business logic in TaskService.
- Implemented CRUD operations (Create, Read, Delete) for tasks.
- Tested API endpoints using Swagger UI (/docs).
- Extended the React frontend to consume FastAPI endpoints.
- Added task creation and deletion functionality in the frontend.
- Connected the frontend API layer (api.js) with the backend services.

*What I Learned:*

- Learned how MVC separates controllers, services, and models.
- Understood how FastAPI uses APIRouter for handling HTTP requests.
- Learned how Pydantic validates request and response data.
- Gained experience implementing CRUD APIs in FastAPI.
- Learned how React components interact with backend APIs using fetch.
- Understood the importance of keeping business logic inside the service layer.

# 04-06-2026
## Mogili Vineeth Reddy

*What I Worked On:*

- Developed a Task Manager application using FastAPI and React following the MVC architecture pattern.
- Implemented CRUD operations for tasks, including task creation, retrieval, and deletion.
- Created API routes using FastAPI APIRouter and added business logic through the service layer.
- Connected the React frontend with the FastAPI backend by integrating API calls and updating the user interface to support task management features.
- Tested backend endpoints using Swagger UI and verified frontend-backend communication.

*What I Learned:*

- Learned how the MVC architecture separates responsibilities between controllers, services, and models, making applications easier to       maintain.
- Gained practical experience using Pydantic schemas for request and response validation in FastAPI.
- Improved my understanding of creating and testing RESTful APIs using FastAPI and Swagger UI.
- Learned how React components interact with backend services through API calls and how frontend actions trigger backend operations.
- Understood the importance of organizing business logic within the service layer to improve code structure and scalability.