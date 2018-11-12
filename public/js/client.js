<script type="text/javascript">

function validate(){
  // initializing
  var college = document.getElementById('college').value;
  var team_name = document.getElementById('team_name').value;
  var team_email = document.getElementById('team_email').value;
  var team_contact = document.getElementById('team_contact').value;
  var members = document.getElementById('members').value;
  var password = document.getElementById('password').value;
  var organisation = document.getElementById('organisation').value;

  // checking empty fields

  if (college == ""){
    alert("Select your college.");
    return false;
  }
  if (team_name == ""){
    alert("Enter your team name");
    return false;
  }
  if (team_email == ""){
    alert("Enter team's email");
    return false;
  }
  if (team_contact == ""){
    alert("Enter team's contact number.");
    return false;
  }
  if(members == "NUMBER OF MEMBERS"){
   alert("Select number of members.");
   return false;
 }
 if (password == ""){
   alert("Enter a password");
   return false;
 }
 if (organisation == ""){
   alert("Enter your organisation.");
   return false;
 }

 // verifying email format

 var emailPat = /^(\".*\"|[A-Za-z]\w*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z]\w*(\.[A-Za-z]\w*)+)$/
 var EmailmatchArray = email.match(emailPat);

 if (EmailmatchArray == null){
  alert("Your email address seems incorrect. Please try again.");
  return false;
  }
}
