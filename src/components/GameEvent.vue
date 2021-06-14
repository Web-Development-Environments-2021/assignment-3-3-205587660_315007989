<template>
  <div class="GameEvent">

    <ul class="game-content">
      <li> eventType:  {{eventType}}</li>
      <li> gameDate:  {{gameDate}}</li>
      <li> gameTime:  {{gameTime}}</li>
      <li> inGameMinute:  {{inGameMinute}}</li>
      <li> eventDescription:  {{eventDescription}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
    return {
     
    };
  },
  
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
eventType: {
  type: String,
  required: true
},
gameDate: {
  type: String,
  required: true
},
gameTime: {
  type: String,
  required: true
},
inGameMinute: {
  type: String,
  required: true
},
eventDescription: {
  type: String,
  required: true
},

  }, 
    components: {
  }, 
  mounted(){
    console.log("game preview mounted")
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
// eventType
// gameDate
// gameTime
// inGameMinute
// eventDescription