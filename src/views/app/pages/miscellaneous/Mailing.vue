
<template>
<div>
  <h3>Contact Form</h3>

  <div class="container">
    <form action="https://formspree.io/mzbeddaw" method="POST">
      <label for="fname">Name</label>
      <input type="text" id="fname" name="firstname" placeholder="Your name..">

      <label for="lname">Subject</label>
      <input type="text" id="lname" name="subject" placeholder="Subject">

      <!-- <label for="country">Country</label>
      <select id="country" name="country">
        <option value="australia">Australia</option>
        <option value="canada">Canada</option>
        <option value="usa">USA</option>
      </select> -->

      <label for="subject">Message</label>
      <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

      <input type="submit" value="Submit">
    </form>
</div>
</div>
</template>

<script>
export default {
  name: "SendMessage",
}

</script>

<style media="screen" scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
