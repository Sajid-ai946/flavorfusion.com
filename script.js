document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const aboutModal = document.getElementById('aboutModal');
    const recipeModal = document.getElementById('recipeModal');
    
    // Button elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutFooter = document.querySelector('.about-footer');
    const loginFooter = document.querySelector('.login-footer');
    
    // Close buttons
    const closeButtons = document.getElementsByClassName('close');
    
    // Forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Recipe grid
    const recipeGrid = document.querySelector('.recipe-grid');
    
    // Sample user data (in a real app, this would be a database)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Current user
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    // Recipe data
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "A creamy, delicious Italian pasta dish with eggs, cheese, pancetta, and pepper.",
            ingredients: [
                "400g spaghetti",
                "200g pancetta or guanciale, diced",
                "4 large eggs",
                "50g pecorino cheese, grated",
                "50g parmesan, grated",
                "Freshly ground black pepper",
                "Salt"
            ],
            instructions: [
                "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
                "While pasta cooks, fry pancetta in a large pan until crispy.",
                "In a bowl, whisk eggs and mix in grated cheeses and plenty of black pepper.",
                "Drain pasta, reserving some cooking water, and immediately add to the pancetta pan.",
                "Remove from heat and quickly stir in the egg mixture, creating a creamy sauce. Add pasta water if needed.",
                "Serve immediately with extra grated cheese and pepper."
            ],
            videoId: "D_2DBLAt57c"
        },
        {
            id: 2,
            title: "Chocolate Chip Cookies",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Soft and chewy cookies loaded with chocolate chips.",
            ingredients: [
                "2 1/4 cups all-purpose flour",
                "1 tsp baking soda",
                "1 tsp salt",
                "1 cup (2 sticks) butter, softened",
                "3/4 cup granulated sugar",
                "3/4 cup packed brown sugar",
                "1 tsp vanilla extract",
                "2 large eggs",
                "2 cups chocolate chips"
            ],
            instructions: [
                "Preheat oven to 375°F (190°C).",
                "Combine flour, baking soda and salt in small bowl.",
                "Beat butter, sugars and vanilla in large mixer bowl until creamy.",
                "Add eggs one at a time, beating well after each addition.",
                "Gradually beat in flour mixture, then stir in chocolate chips.",
                "Drop by rounded tablespoon onto ungreased baking sheets.",
                "Bake for 9-11 minutes or until golden brown.",
                "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely."
            ],
            videoId: "3vUtRRZG0xY"
        },
        {
            id: 3,
            title: "Vegetable Stir Fry",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Quick and healthy vegetable stir fry with a delicious sauce.",
            ingredients: [
                "2 tbsp vegetable oil",
                "1 onion, sliced",
                "2 cloves garlic, minced",
                "1 bell pepper, sliced",
                "1 carrot, julienned",
                "1 cup broccoli florets",
                "1 cup snap peas",
                "2 tbsp soy sauce",
                "1 tbsp oyster sauce",
                "1 tsp sesame oil",
                "1 tsp cornstarch mixed with 2 tbsp water"
            ],
            instructions: [
                "Heat oil in a wok or large skillet over high heat.",
                "Add onion and garlic, stir-fry for 30 seconds.",
                "Add bell pepper, carrot, and broccoli. Stir-fry for 2-3 minutes.",
                "Add snap peas and continue cooking for another minute.",
                "In a small bowl, mix soy sauce, oyster sauce, and sesame oil.",
                "Pour sauce over vegetables and toss to coat.",
                "Add cornstarch mixture and stir until sauce thickens.",
                "Serve hot over rice or noodles."
            ],
            videoId: "spDs_wzn8To"
        },
        {
            id: 4,
            title: "Beef Burger",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Juicy homemade beef burger with all the fixings.",
            ingredients: [
                "500g ground beef (20% fat)",
                "1 small onion, finely chopped",
                "1 egg",
                "1/2 cup breadcrumbs",
                "1 tsp Worcestershire sauce",
                "1 tsp mustard",
                "Salt and pepper to taste",
                "4 burger buns",
                "Lettuce, tomato, cheese for serving"
            ],
            instructions: [
                "In a large bowl, mix ground beef, onion, egg, breadcrumbs, Worcestershire sauce, mustard, salt and pepper.",
                "Divide mixture into 4 equal portions and shape into patties.",
                "Heat grill or frying pan over medium-high heat.",
                "Cook patties for 4-5 minutes per side for medium doneness.",
                "If using cheese, add during last minute of cooking to melt.",
                "Toast burger buns lightly.",
                "Assemble burgers with your favorite toppings and serve immediately."
            ],
            videoId: "BIG1h2vG-Qg"
        }
    ];
    
    // Display recipes
    function displayRecipes() {
        recipeGrid.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <div class="recipe-img">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
                <div class="recipe-info">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button class="btn view-recipe" data-id="${recipe.id}">View Recipe</button>
                </div>
            `;
            recipeGrid.appendChild(recipeCard);
        });
        
        // Add event listeners to recipe buttons
        document.querySelectorAll('.view-recipe').forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = parseInt(this.getAttribute('data-id'));
                showRecipeDetails(recipeId);
            });
        });
    }
    
    // Show recipe details
    function showRecipeDetails(recipeId) {
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;
        
        const recipeContent = document.getElementById('recipeContent');
        recipeContent.innerHTML = `
            <div class="recipe-details-content">
                <div class="recipe-details-img">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
                <div class="recipe-details-info">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.description}</p>
                    
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recipe-instructions">
                    <h3>Instructions</h3>
                    <ol>
                        ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="recipe-video">
                    <h3>Video Tutorial</h3>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${recipe.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        recipeModal.style.display = 'block';
    }
    
    // Event listeners for modal buttons
    function setupModalButtons() {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
        
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'block';
        });
        
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            aboutModal.style.display = 'block';
        });
        
        aboutFooter.addEventListener('click', function(e) {
            e.preventDefault();
            aboutModal.style.display = 'block';
        });
        
        loginFooter.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
    }
    
    // Close modals when clicking on X
    function setupCloseButtons() {
        Array.from(closeButtons).forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });
    }
    
    // Close modals when clicking outside
    function setupOutsideClick() {
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    
    // Login form submission
    function setupLoginForm() {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showAlert('Login successful!', 'success');
                loginModal.style.display = 'none';
                updateNav();
            } else {
                showAlert('Invalid email or password', 'error');
            }
        });
    }
    
    // Signup form submission
    function setupSignupForm() {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            if (users.some(u => u.email === email)) {
                showAlert('Email already registered', 'error');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name,
                email,
                password
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showAlert('Registration successful! You are now logged in.', 'success');
            signupModal.style.display = 'none';
            updateNav();
        });
    }
    
    // Show alert message
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('fade-out');
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // Update navigation based on login status
    function updateNav() {
        if (currentUser) {
            loginBtn.textContent = 'Logout';
            loginBtn.removeEventListener('click', loginBtn.click);
            loginBtn.addEventListener('click', logout);
            signupBtn.style.display = 'none';
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'block';
            });
            signupBtn.style.display = 'inline-block';
        }
    }
    
    // Logout function
    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateNav();
        showAlert('You have been logged out', 'success');
    }
    
    // Initialize the page
    function init() {
        displayRecipes();
        setupModalButtons();
        setupCloseButtons();
        setupOutsideClick();
        setupLoginForm();
        setupSignupForm();
        updateNav();
        
        // Add alert styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: 600;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1100;
                animation: slideIn 0.5s;
            }
            
            .alert.success {
                background-color: var(--success-color);
            }
            
            .alert.error {
                background-color: var(--primary-color);
            }
            
            .fade-out {
                animation: fadeOut 0.5s;
                opacity: 0;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    init();
});