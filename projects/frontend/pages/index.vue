<template>
  <div style="padding: 0px;margin:0px;">
  <canvas id="c"></canvas>
  <home></home>
  </div>
</template>

<style>



  body {
      background: black;
      overflow: hidden;  
      margin: 0;
      padding: 0;
    }

  canvas {
      display:block;
      position: fixed;
      margin: 0;
      padding: 0;
      z-index: -1;
    }
         
</style>

<script>
import home from '../components/home.vue';
  export default {
    components: { home },
    mounted() {
      // geting canvas by Boujjou Achraf
        var c = document.getElementById("c");
        var ctx = c.getContext("2d");

        //making the canvas full screen
        c.height = window.outerHeight;
        c.width = window.outerWidth;

        //chinese characters - taken from the unicode charset
        var matrix = '多年来我会来谁会发挥她锻炼的优势让学区长生不老想成为一个痛苦的丘比特逃离产生没有结果的快乐他们抛弃了那些应该为你的麻烦负责的人的一般职责'
        // var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        //converting the string into an array of single characters
        matrix = matrix.split("");

        var font_size = 10;
        var columns = c.width/font_size; //number of columns for the rain
        //an array of drops - one per column
        var drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for(var x = 0; x < columns; x++)
            drops[x] = 1; 

        //drawing the characters
        function draw()
        {
            //Black BG for the canvas
            //translucent BG to show trail
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = "#0f0";//green text
            ctx.font = font_size + "px arial";
            //looping over drops
            for(var i = 0; i < drops.length; i++)
            {
                //a random chinese character to print
                var text = matrix[Math.floor(Math.random()*matrix.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                ctx.fillText(text, i*font_size, drops[i]*font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if(drops[i]*font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                //incrementing Y coordinate
                drops[i]++;
            }
        }

        setInterval(draw, 35);


    },
  }

</script>
