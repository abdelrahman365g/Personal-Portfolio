var darkmode = localStorage.getItem("darkmode");
var themeSwitch = document.querySelector("#theme-toggle-button");
var settingsToggle = document.querySelector("#settings-toggle");
var settingsSidebar = document.querySelector("#settings-sidebar");
var closeSettingsButton = document.querySelector("#close-settings");
var sidebar = false;
var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
var carousel = document.querySelector("#testimonials-carousel");
var carouselItems = document.querySelectorAll(".testimonial-card");
var nextButton = document.querySelector("#next-testimonial");
var prevButton = document.querySelector("#prev-testimonial");
var carouselNavigationButtons = Array.from(document.querySelectorAll(".carousel-indicator"));
var fontButtons = Array.from(document.querySelectorAll(".font-option"));
var resetButton = document.querySelector("#reset-settings");
var themeButtons = Array.from(document.querySelectorAll(".theme-btn"));
var contactName = document.querySelector("#full-name");
var contactPhone = document.querySelector("#phone");
var contactEmail = document.querySelector("#email");
var nameError = document.querySelector("#nameError");
var phoneError = document.querySelector("#phoneError");
var emailError = document.querySelector("#emailError");
var detailsInput = document.querySelector("#project-details");
var submitButton = document.querySelector("#submitButton");
var contactForm = document.querySelector("#contactForm");
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-link");
var selects = document.querySelectorAll(".custom-select");
var savedTheme = localStorage.getItem("selectedTheme");
var carouselIndex = 0;
var nameRegex = /^[A-Za-z][A-Za-z\s]{1,}$/;
var phoneRegex = /^(?:\+20|20|0020|0)(10|11|12|15)\d{8}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
var fontList = ["font-alexandria" , "font-tajawal" , "font-cairo"];
var themeList = [
  "theme-purple-blue",
  "theme-pink-orange",
  "theme-green-emerald",
  "theme-blue-cyan",
  "theme-red-rose",
  "theme-amber-orange",
]

function enableDarkMode() {
  document.querySelector("html").classList.add("dark");
  localStorage.setItem("darkmode", "enabled");
}
function disableDarkMode() {
  document.querySelector("html").classList.remove("dark");
  localStorage.setItem("darkmode", "disabled");
}
function toggleDarkMode() {
  darkmode = localStorage.getItem("darkmode");
  darkmode === "enabled" ? disableDarkMode() : enableDarkMode();
}
if (darkmode == "enabled") enableDarkMode();

function toggleSidebar() {
  sidebar = !sidebar;
  if (sidebar) {
    openSidebar();
  } else {
    closeSidebar();
  }
}
function openSidebar(){
    settingsSidebar.classList.remove("translate-x-full");
    settingsToggle.style.right = "20rem";
    settingsSidebar.setAttribute("aria-hidden","false");
}
function closeSidebar() {
  sidebar = false;
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0";
  settingsSidebar.setAttribute("aria-hidden","true");
}
function moveCarousel(){
    var cardWidth = carouselItems[0].offsetWidth;
    carousel.style.transform = `translateX(${carouselIndex * cardWidth}px)`;
    carouselNavigationButtons.forEach((item) => {
        item.classList.remove("active");
    })
    carouselNavigationButtons[carouselIndex].classList.add("active");

}
function carouselNext(){
    carouselIndex < carouselItems.length - 3 ? carouselIndex ++ : carouselIndex =0;
    moveCarousel();
}
function carouselPrev(){
    carouselIndex > 0  ? carouselIndex -- : carouselIndex = carouselItems.length - 3;
    moveCarousel();
}
function reset(){
    fontList.forEach((font) =>{
        document.body.classList.remove(font);
    })
    fontButtons.forEach((btn)=>{
        btn.classList.remove("active" , "border-primary" , "bg-slate-50" ,"dark:bg-slate-800");
        btn.classList.add("border-slate-200","dark:border-slate-700");
    })
    themeList.forEach((theme)=>{
        document.querySelector("html").classList.remove(theme);
    })
    themeButtons.forEach(btn => btn.classList.remove("active"));
    themeButtons[0].classList.add("active");
    document.body.classList.add(fontList[1]);
    document.querySelector("html").classList.add(themeList[0]);
    fontButtons[1].classList.remove("border-slate-200","dark:border-slate-700");
    fontButtons[1].classList.add("active" , "border-primary" , "bg-slate-50" ,"dark:bg-slate-800");
}
if (savedTheme) {
  document.querySelector("html").classList.add(savedTheme);
  var index = themeList.indexOf(savedTheme);
  themeButtons.forEach(btn => btn.classList.remove("active"));
  themeButtons[index].classList.add("active");
}
function validateName() {
  var value = contactName.value.trim();

  if (!nameRegex.test(value)) {
    showError(contactName, nameError);
    return false;
  }
  hideError(contactName, nameError);
  return true;
}

function validatePhone() {
  var value = contactPhone.value.trim();

  if (!phoneRegex.test(value)) {
    showError(contactPhone, phoneError);
    return false;
  }
  hideError(contactPhone, phoneError);
  return true;
}

function validateEmail() {
  var value = contactEmail.value.trim();
  
  if (value === "") {
    emailError.textContent = "يرجى إدخال البريد الإلكتروني";
    showError(contactEmail, emailError);
    return false;
  }
  
  if (!emailRegex.test(value)) {
    emailError.textContent = "يرجى إدخال ايميل صحيح";
    showError(contactEmail, emailError);
    return false;
  }
  
  hideError(contactEmail, emailError);
  return true;
}
function validateProjectDetails() {
  var value = detailsInput.value.trim();
  var detailsError = document.querySelector("#detailsError");
  
  if (value === "") {
    detailsError.textContent = "يرجى إدخال تفاصيل المشروع.";
    showError(detailsInput, detailsError);
    return false;
  }
  
  if (value.split(" ").length < 3) {
    detailsError.textContent = "من فضلك ادخل بيانات كافية عن المشروع (على الأقل 3 كلمات)";
    showError(detailsInput, detailsError);
    return false;
  }
  
  hideError(detailsInput, detailsError);
  return true;
}

function showError(input, errorText) {
  input.classList.add("input-error");
  errorText.classList.remove("hidden");
}

function hideError(input, errorText) {
  input.classList.remove("input-error");
  errorText.classList.add("hidden");
}
function submitForm() {
  var isNameValid = validateName();
  var isEmailValid = validateEmail();
  var isPhoneValid = validatePhone();
  var isProjectDetailsValid = validateProjectDetails();
  
  var nameValue = contactName.value.trim();
  var emailValue = contactEmail.value.trim();
  var phoneValue = contactPhone.value.trim();
  var projectDetailsValue =detailsInput.value.trim();
  
  if (!isNameValid || !isEmailValid || !isPhoneValid || !isProjectDetailsValid || 
      nameValue === "" || emailValue === "" || phoneValue === "" || projectDetailsValue === "") {
    
    var emptyFields = [];
    
    if (nameValue === "") {
      nameError.textContent = "يرجى إدخال الاسم الكامل";
      showError(contactName, nameError);
      emptyFields.push("الاسم الكامل");
    }
    
    if (emailValue === "") {
      emailError.textContent = "يرجى إدخال البريد الإلكتروني";
      showError(contactEmail, emailError);
      emptyFields.push("البريد الإلكتروني");
    }
    
    if (phoneValue === "") {
      phoneError.textContent = "يرجى إدخال رقم الهاتف";
      showError(contactPhone, phoneError);
      emptyFields.push("رقم الهاتف");
    }
    
    if (projectDetailsValue === "") {
      var detailsError = document.querySelector("#detailsError");
      detailsError.textContent = "يرجى إدخال تفاصيل المشروع";
      showError(document.querySelector("#project-details"), detailsError);
      emptyFields.push("تفاصيل المشروع");
    }
    
    var errorHtml = "";
    if (emptyFields.length > 0) {
      errorHtml = `<div class="text-right"><p>الحقول التالية مطلوبة:</p><ul class="list-disc pr-4 mt-2">${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
    } else {
      errorHtml = `<div class="text-center"><p>من فضلك قم بتصحيح الأخطاء في النموذج.</p></div>`;
    }
    
    Swal.fire({
      icon: "error",
      title: "بيانات غير صحيحة!",
      html: errorHtml,
      confirmButtonText: 'حسناً',
      backdrop: true
    });
    
    return;
  }
  contactForm.reset();
  hideError(contactName, nameError);
  hideError(contactEmail, emailError);
  hideError(contactPhone, phoneError);
  hideError(detailsInput, detailsError);
  
  Swal.fire({
    icon: 'success',
    title: 'تم إرسال رسالتك بنجاح!',
    text: 'شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.',
    showConfirmButton: true,
    confirmButtonText: 'حسناً',
    backdrop: true,
    timer: 3000
  });
}
function scrollSpy() {
  var scrollY = window.pageYOffset;

  sections.forEach((section) => {
    var sectionHeight = section.offsetHeight;
    var sectionTop = section.offsetTop - 100;
    var sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}
scrollSpy();
backToTop();
function backToTop(){
  var scrollY = window.pageYOffset;
  var sectionHeight = document.querySelector("#hero-section").offsetHeight;
  if(scrollY > sectionHeight/3){
    document.querySelector("#scroll-to-top").classList.remove("invisible","opacity-0");
  }else{
    document.querySelector("#scroll-to-top").classList.add("invisible","opacity-0");
  }
}
function closeAllSelects(current) {
  document.querySelectorAll(".custom-options").forEach((opts) => {
    if (opts !== current.nextElementSibling) {
      opts.classList.add("hidden");
      opts.previousElementSibling
        .querySelector(".fa-chevron-down")
        .style.transform = "rotate(0deg)";
    }
  });
}

window.addEventListener("scroll", function(){
  scrollSpy();
  backToTop();
});
themeSwitch.addEventListener("click", toggleDarkMode);
settingsToggle.addEventListener("click", toggleSidebar);
closeSettingsButton.addEventListener("click",closeSidebar);
nextButton.addEventListener("click",carouselNext);
prevButton.addEventListener("click",carouselPrev);
resetButton.addEventListener("click",reset);
contactName.addEventListener("input", validateName);
contactEmail.addEventListener("input", validateEmail);
contactPhone.addEventListener("input", validatePhone);
detailsInput.addEventListener("input", validateProjectDetails);
submitButton.addEventListener("click",submitForm);
document.addEventListener("click", function(e){
    if(!settingsSidebar.contains(e.target) && !settingsToggle.contains(e.target) && !closeSettingsButton.contains(e.target)){
        closeSidebar();
    }
});
document.querySelector("#scroll-to-top").addEventListener("click",function(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});
for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function (e) {
    var btn = e.currentTarget;
    var filter = btn.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    portfolioItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";
    });

    setTimeout(() => {
      portfolioItems.forEach((item) => {
        var category = item.dataset.category;
        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      setTimeout(() => {
        portfolioItems.forEach((item) => {
          var category = item.dataset.category;
          if (filter === "all" || category === filter) {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }
        });
      }, 10);
    }, 300);
  });
}
for(var i =0; i<carouselNavigationButtons.length ; i++){
    carouselNavigationButtons[i].addEventListener("click",function(e){
        carouselIndex = carouselNavigationButtons.indexOf(e.target);
        moveCarousel();
    })
}
for(var i=0;i<fontButtons.length;i++){
    fontButtons[i].addEventListener("click",function(e){
        fontOption = fontButtons.indexOf(e.currentTarget);
        fontList.forEach((font) =>{
            document.body.classList.remove(font);
        })
        fontButtons.forEach((btn)=>{
            btn.classList.remove("active" , "border-primary" , "bg-slate-50" ,"dark:bg-slate-800");
            btn.classList.add("border-slate-200","dark:border-slate-700");
        })
        document.body.classList.add(fontList[fontOption]);
        e.currentTarget.classList.remove("border-slate-200","dark:border-slate-700");
        e.currentTarget.classList.add("active" , "border-primary" , "bg-slate-50" ,"dark:bg-slate-800");
    })
}
for(var i=0;i<themeButtons.length;i++){
    themeButtons[i].addEventListener("click",function(e){
        var button = e.target
        var buttonIndex = themeButtons.indexOf(button);
        themeList.forEach((theme)=>{
            document.querySelector("html").classList.remove(theme);
        })
        themeButtons.forEach((btn)=>{
            btn.classList.remove("active");
        })
        button.classList.add("active");
        document.querySelector("html").classList.add(themeList[buttonIndex]);
        localStorage.setItem("selectedTheme", themeList[buttonIndex]);
    })
}
for(var i =0;i<selects.length;i++){
  let select = selects[i];
  let selectedText = select.querySelector(".selected-text");
  let arrow = select.querySelector(".fa-chevron-down");
  let options = select.nextElementSibling;
  let optionItems = options.querySelectorAll(".custom-option");
  select.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllSelects(select);
    options.classList.toggle("hidden");
    arrow.style.transform = options.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });
  optionItems.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedText.textContent = option.dataset.value;
      selectedText.classList.remove(
        "text-slate-400",
        "text-slate-500",
        "dark:text-slate-400"
      );
      selectedText.classList.add("text-slate-800", "dark:text-white");
      optionItems.forEach((o) =>
        o.classList.remove("bg-primary/10")
      );
      option.classList.add("bg-primary/10");
      options.classList.add("hidden");
      arrow.style.transform = "rotate(0deg)";
    });
  });
}
document.addEventListener("click", function() {
  document.querySelectorAll(".custom-options").forEach((opts) => {
    opts.classList.add("hidden");
    opts.previousElementSibling
      .querySelector(".fa-chevron-down")
      .style.transform = "rotate(0deg)";
  });
});