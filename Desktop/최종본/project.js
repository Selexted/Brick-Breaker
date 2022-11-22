$(document).ready(function() {

    var musicSound = true;  //배경음악
    var effectSound = true; //효과음
    var ballSpeed = 1;      //공 속도
    var blockStyle = 1;     //벽돌색



    //////////////////////////////////////////////////////////////////////
   //init
        var WIDTH,
            HEIGHT;

        var x = 200,
            y = 480,
            radius = 25;

        var dx = 4 ,
            dy = 8 ;

        var b_dx=4;
        var b_dy=8;

        var x_6=0;
        var y_6=0;

        var paddle_x, paddle_h, paddle_w;

        var is_gameover = false;
        var is_leftPannel = false;
        var is_rightPannel = false;
        var is_clear= false;
        var show_ending=false;
        var start_act=false;


        var bricks0;
        var bricks1;
        var bricks2;
        var bricks3;
        var bricks4;
        var bricks5;


        var NROWS=[0,0,0,0,0,0];
        var NCOLS=[0,0,0,0,0,0];
        var BRICKWIDTH=[0,0,0,0,0,0];
        var BRICKHEIGHT=[0,0,0,0,0,0];
        var PADDING=[0,0,0,0,0,0];
        var left_brick=[0,0,0,0,0,0];

        var ctx;
        var anim_game;

        var score = 0;
        var s_score = [0, 0, 0, 0, 0];

        var choose_level;
        

        var paddle_hit =new Audio('king jump.wav');
        var wall_hit =new Audio('king bump.wav');
        var brick_hit =new Audio('king splat.wav');
        var clear_mus = new Audio('clear.wav');

        var king =new Image;
        king.src='base_right.png';


        var level=0;

        var stage =0;

        var pd;
        pd= new Image();
        pd.src="paddle_img.jpg";

        var lv0;
        lv0= new Image();
        lv0.src="lv0.jpg";

        var lv1;
        lv1= new Image();
        lv1.src="lv1.jpg";

        var lv2;
        lv2= new Image();
        lv2.src="lv2.jpg";

        var lv3;
        lv3= new Image();
        lv3.src="lv3.jpg";

        var lv4;
        lv4= new Image();
        lv4.src="lv4.jpg";

        var lv5;
        lv5= new Image();
        lv5.src="lv5.jpg";

        var lv6;
        lv6= new Image();
        lv6.src="Tower.png";

        var lv0_b;
        lv0_b=new Image;
        lv0_b.src="lv0_b.jpg";

        var lv1_b;
        lv1_b=new Image;
        lv1_b.src="lv1_b.jpg";

        var lv2_b;
        lv2_b=new Image;
        lv2_b.src="lv2_b.png";

        var lv3_b;
        lv3_b=new Image;
        lv3_b.src="lv3_b.jpg";

        var lv4_b;
        lv4_b=new Image;
        lv4_b.src="lv4_b.jpg";

        var lv5_b;
        lv5_b=new Image;
        lv5_b.src="lv5_b.png";
        


        function blockimg(num){

 
       if(num==1){
        lv0_b.src="lv0_b.jpg";
        lv1_b.src="lv1_b.jpg";
        lv2_b.src="lv2_b.png";
        lv3_b.src="lv3_b.jpg";
        lv4_b.src="lv4_b.jpg";
        lv5_b.src="lv5_b.png";

       }

       else if(num==2){
        lv0_b.src="lv0_b1.jpg";
        lv1_b.src="lv1_b1.jpg";
        lv2_b.src="lv2_b1.jpg";
        lv3_b.src="lv3_b1.jpg";
        lv4_b.src="lv4_b1.jpg";
        lv5_b.src="lv5_b1.jpg";

       }


       else if(num==3){
        lv0_b.src="lv0_b2.jpg";
        lv1_b.src="lv1_b2.jpg";
        lv2_b.src="lv2_b2.jpg";
        lv3_b.src="lv3_b2.jpg";
        lv4_b.src="lv4_b2.jpg";
        lv5_b.src="lv5_b2.jpg";

       }
        

        }


      

        ///////////////////////////////////////////////////////////////////////////

    const bgm = document.getElementById("menuAudio");

    const open_bgm= new Audio("opening theme.wav");

    var stIntBool = 0;
    var interval = setInterval(function() {
        if(stIntBool%2==0)
            $("#start").css("text-shadow", "-1px 0px #B0B0B0, 0px 1px #B0B0B0, 1px 0px #B0B0B0, 0px -1px #B0B0B0, 5px 5px black");
        else
            $("#start").css("text-shadow", "-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white, 5px 5px black");
        stIntBool++;
    }, 500);

    function menuSlide(efSound) {
        if(efSound){
            setTimeout(function() {
                const audio = document.getElementById("slideSound");
                audio.play();
            }, 200);
        }
    }

    $("#start").on("click", function() {
        clearInterval(interval);
        $("#start").css("display", "none");

        bgm.play();

        $("#title").animate({marginTop: '100px'});
        $("#menu").show("slow");

        menuSlide(effectSound);
    });

    $(".button").on("mouseover", function() {
        if(effectSound){
            const audio = document.getElementById("hoverSound");
            audio.volume = 0.4;
            audio.play();
        }
    });

    $(".button").on("click", function() {
        if(effectSound){
            const audio = document.getElementById("clickSound");
            audio.volume = 0.5;
            audio.play();
        }
    });

    $("#gameStart").on("click", function() {
        $("#menu").hide("slow");
        $("#stageMenu").show("slow");
        menuSlide(effectSound);
    });

    $("#gameOption").on("click", function() {
        $("#menu").hide("slow");
        $("#optionMenu").show("slow");
        menuSlide(effectSound);
    });

    $("#rule").on("click", function() {
        $("#menu").hide("slow");
        $("#ruleMenu").show("slow");
        menuSlide(effectSound);
    });

    $("#score").on("click", function() {
        $("#menu").hide("slow");
        $("#scoreBoard").show("slow");
        menuSlide(effectSound);
        $("#1st").text("\u00a01st\u00a0\u00a0\u00a0\u00a0"+s_score[0]);
        $("#2nd").text("2nd\u00a0\u00a0\u00a0"+s_score[1]);
        $("#3rd").text("3rd\u00a0\u00a0\u00a0\u00a0"+s_score[2]);
        $("#4th").text("4th\u00a0\u00a0\u00a0\u00a0"+s_score[3]);
        $("#5th").text("5th\u00a0\u00a0\u00a0\u00a0"+s_score[4]);
    });

    $(".back").on("click", function() {
        if(effectSound){
            const audio = document.getElementById("clickSound");
            audio.volume = 0.5;
            audio.play();
        }
        $("#stageMenu").hide("slow");
        $("#optionMenu").hide("slow");
        $("#ruleMenu").hide("slow");
        $("#scoreBoard").hide("slow");
        $("#menu").show("slow");
        menuSlide(effectSound);
    });

    $("#music_button").on("click", function() {
        if(musicSound){
            musicSound = false;
            $("#music_button").attr("value", "off");
            $("#music_button").css("text-shadow", "-1px 0px #A0A0A0, 0px 1px #A0A0A0, 1px 0px #A0A0A0, 0px -1px #A0A0A0");
            bgm.pause();
        }
        else{
            musicSound = true;
            $("#music_button").attr("value", "on");
            $("#music_button").css("text-shadow", "-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white");
            bgm.play(); 
        }
    });

    $("#effect_button").on("click", function() {
        if(effectSound){
            effectSound = false;
            $("#effect_button").attr("value", "off");
            $("#effect_button").css("text-shadow", "-1px 0px #A0A0A0, 0px 1px #A0A0A0, 1px 0px #A0A0A0, 0px -1px #A0A0A0");
        }
        else{
            effectSound = true;
            $("#effect_button").attr("value", "on");
            $("#effect_button").css("text-shadow", "-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white");
        }
    });

    $("#ball_s").on("click", function() {
        var b_s = $("#ball_s").attr("value");
        if(b_s=="slow"){
            $("#ball_s").attr("value", "normal");
            $("#ball_s").css("text-shadow", "-1px 0px #4169E1, 0px 1px #4169E1, 1px 0px #4169E1, 0px -1px #4169E1");
            $("#ball_sImg").attr("src", "normal.png")
      
            b_dx=4;
            b_dy=8;

        }
        else if(b_s=="normal"){
            $("#ball_s").attr("value", "fast");
            $("#ball_s").css("text-shadow", "-1px 0px #B22222, 0px 1px #B22222, 1px 0px #B22222, 0px -1px #B22222");
            $("#ball_sImg").attr("src", "fast.png")
            b_dx=6;
            b_dy=12;
        }
        else{
            $("#ball_s").attr("value", "slow");
            $("#ball_s").css("text-shadow", "-1px 0px #9ACD32, 0px 1px #9ACD32, 1px 0px #9ACD32, 0px -1px #9ACD32");
            $("#ball_sImg").attr("src", "slow.png")
            b_dx=2;
            b_dy=4;
        }
    });

    $("#block_s1").on("click", function() {
        $("#block_s1").css("border", "2px solid white");
        $("#block_s2").css("border", "2px solid #303030");
        $("#block_s3").css("border", "2px solid #303030");
        blockStyle = 1;

    });

    $("#block_s2").on("click", function() {
        $("#block_s1").css("border", "2px solid #303030");
        $("#block_s2").css("border", "2px solid white");
        $("#block_s3").css("border", "2px solid #303030");
        blockStyle = 2;
    });

    $("#block_s3").on("click", function() {
        $("#block_s1").css("border", "2px solid #303030");
        $("#block_s2").css("border", "2px solid #303030");
        $("#block_s3").css("border", "2px solid white");
        blockStyle = 3;
    });

    function show_canvas() {
        $("#startMenu").hide("slow");
        $("#canvas").show("slow");
       

    }

    function close_canvas() {
        
        $("#canvas").hide("slow");
        $("#startMenu").show("slow");
       

    }



    $("#firstStage").on("click", function() {
        score=10000;
        stage=1;
        bgm.pause();
        if(effectSound==true){
                        open_bgm.play();
            }

        $("#startMenu").hide("slow");
        $("#start_div").show("slow");
        
        setTimeout(function(){
        $("#start_div").hide("slow");
        show_canvas();
        
        }, 10000);

        setTimeout(function(){

        init();
        init_faddle();
        init_level(1);
        },11000);

       
        
    });

    $("#secondStage").on("click", function() {
        score=10000;
        stage=2;
        bgm.pause();
         if(effectSound==true){
                        open_bgm.play();
            }

        $("#startMenu").hide("slow");
        $("#start_div").show("slow");
        
        setTimeout(function(){
        $("#start_div").hide("slow");
        show_canvas();
        
        }, 10000);

        setTimeout(function(){

        init();
        init_faddle();
        init_level(2);
        },11000);
        
    });

    $("#finalStage").on("click", function() {
        score=10000;
        stage=3;
        bgm.pause();
           if(effectSound==true){
                        open_bgm.play();
            }
        

        $("#startMenu").hide("slow");
        $("#start_div").show("slow");
        
        setTimeout(function(){
        $("#start_div").hide("slow");
        show_canvas();
        
        }, 10000);

        setTimeout(function(){

        init();
        init_faddle();
        init_level(3);
        },11000);
        
    });

        

        function init() {
             //canvas의 정보 가지고 오기
            ctx = $('#canvas')[0].getContext('2d');
            WIDTH = $('#canvas').width();  
            HEIGHT = $('#canvas').height();
            blockimg(blockStyle);
            is_gameover = false;
            is_clear=false;
            show_ending=false;
            is_rightPannel=false;
            is_leftPannel=false;

            
            x=200;
            y=400;

            dx=b_dx;
            dy=b_dy;

            anim_game = window.requestAnimationFrame(draw);
        }


        var k;

        function cal_score(){

            var a=0;
            if(stage==1){
                a=left_brick[1];
                score -= 10;
            }

            else if (stage==2){
                a=left_brick[3];
                score -= 20;
            }

            else{
                a=left_brick[5];
                score -= 30;
            }
            k=a;
        }

        function show_score(){
            var p_score = "score" +" "+ score;
            ctx.font = "bold 24pt 'Macondo'";
            ctx.strokeStyle = "white";
            ctx.strokeText(p_score, 612, 30);
            ctx.fillText(p_score, 612, 30);
        }
     
        var s_i = 0;
        function save_score() {
            s_score[s_i] = score;
            s_score.sort(function(a,b){
                return b-a;
            });
            s_i++;
        }

        function clear_brick() {
            left_brick=[0,0,0,0,0,0];
        }
        

        function draw() {


            if(level==0){
               level0();
            }

            else if (level==1){
                level1();
            }

            else if (level==2){
                level2();
            }

            else if (level==3){
                level3();
            }

            else if (level==4){
                level4();
            }

            else if (level==5){
                level5();
            }

            else if(level==6){
                level6();
            }


            if (is_gameover) {
                window.cancelAnimationFrame(anim_game);
             } 

            else if(k==0&&stage!=3){
                window.cancelAnimationFrame(anim_game);
               

                if(stage==1){
                    clear_mus.play();
                    alert("Stage1 Clear!");
                    k=1;
                    stage=2;
                    init();
                    init_faddle();
                    init_level(2);
                    level=0;
                }

                else if(stage==2){
                    clear_mus.play();
                    alert("Stage2 Clear!");
                    k=1;
                    stage=3;
                    init();
                    init_faddle();
                    init_level(3);
                    level=0;


                }

 

            }

            else if(show_ending){
                m=0;
                    $("#canvas").hide("slow");
                    $('#ending').show("slow");
                    save_score();
                    setTimeout(function(){
                        if (window.confirm('축하합니다 모든 스테이지를 클리어 하셨습니다!')){
                        $('#ending').hide();
                         close_canvas();
                     }

                         else{
                        $('#ending').hide();
                         close_canvas();
                         }

                    
                }, 2000);

            }

           
            else{
                anim_game = window.requestAnimationFrame(draw);
                show_score();

                
            }
                
                
        }

        function clear() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }


        function king_b(x, y, r) {

            ctx.drawImage(king,x,y);
        }

        function draw_paddle(x, y, w, h) {

            ctx.drawImage(pd,x,y,w,h);
        }


        function init_faddle() {
            paddle_x = WIDTH / 2;
            paddle_h = 20;


            if(stage==1){
                paddle_w=300;
            }
            else if(stage==2){
                paddle_w=250;
            }
            else{
                paddle_w=200;
            }


        }

        function init_level(num) {

            choose_level=num;

            if(num==1){
                clear_brick();
                level0_brick();
                level1_brick();
            }

            else if(num==2){
                clear_brick();
                level0_brick();
                level1_brick();
                level2_brick();
                level3_brick();
            }

            else if(num==3){
                clear_brick();
                level0_brick();
                level1_brick();
                level2_brick();
                level3_brick();
                level4_brick();
                level5_brick();

                // left_brick=[1,0,0,0,0,0];

            }
            



        }


        function level0_brick() { 


            NROWS[0] = 5;  // 세로블록수
            NCOLS[0] = 5;  // 가로블록수
            PADDING[0] = 0;
            BRICKWIDTH[0] = (WIDTH / NCOLS[0]);
            BRICKHEIGHT[0] = 30;

            bricks0 = new Array(NROWS[0]);
            
           
            for (i = 0; i < NROWS[0]; i++) {
                bricks0[i] = new Array(NCOLS[0]);
                for (j = 0; j < NCOLS[0]; j++) {
                    if(i==0 || i==1){
                        bricks0[i][j] = 0;
                    }
                    else
                    bricks0[i][j] = 1;
                }
            }
            for(i=0; i<NCOLS[0];i++){
                bricks0[4][i]=0;
            }

            bricks0[3][0]=0;
            bricks0[3][4]=0;
            bricks0[4][2]=1;

    

             for (i = 0; i < NROWS[0]; i++) {
                for (j = 0; j < NCOLS[0]; j++) {
                    
                    

                    left_brick[0] +=bricks0[i][j];
                }
            }
        }

        function level1_brick() {
            NROWS[1] = 5;  // 세로블록수
            NCOLS[1] = 5;  // 가로블록수
            PADDING[1] = 0;
            BRICKWIDTH[1] = (WIDTH / NCOLS[1]);
            BRICKHEIGHT[1] = 30;

            bricks1 = new Array(NROWS[1]);
            
           
            for (i = 0; i < NROWS[1]; i++) {
                bricks1[i] = new Array(NCOLS[1]);
                for (j = 0; j < NCOLS[1]; j++) {
                    if( i%2==0){
                        bricks1[i][j] = 0;
                    }
                    else{
                        bricks1[i][j]=1;
                    }
                }
            }


             for (i = 0; i < NROWS[1]; i++) {
                for (j = 0; j < NCOLS[1]; j++) {
                    
                   
                    
                    left_brick[1] +=bricks1[i][j];
                }
            }
        }

        function level2_brick() {
            NROWS[2] = 6;  // 세로블록수
            NCOLS[2] = 8;  // 가로블록수
            PADDING[2] = 0;
            BRICKWIDTH[2] = (WIDTH / NCOLS[2]);
            BRICKHEIGHT[2] = 30;

            bricks2 = new Array(NROWS[2]);
            
           
            for (i = 0; i < NROWS[2]; i++) {
                bricks2[i] = new Array(NCOLS[2]);
                for (j = 0; j < NCOLS[2]; j++) {
                    if( i%2==0){
                        bricks2[i][j] = 0;
                    }
                    else{
                        bricks2[i][j]=1;
                    }
                }
            }

             for (i = 0; i < NROWS[2]; i++) {
                for (j = 0; j < NCOLS[2]; j++) {
                    
                    
                    left_brick[2] +=bricks2[i][j];
                }
            }
        }

        function level3_brick() {
            NROWS[3] = 6;  // 세로블록수
            NCOLS[3] = 8;  // 가로블록수
            PADDING[3] = 0;
            BRICKWIDTH[3] = (WIDTH / NCOLS[3]);
            BRICKHEIGHT[3] = 30;

            bricks3 = new Array(NROWS[3]);
            
            
            for (i = 0; i < NROWS[3]; i++) {
                bricks3[i] = new Array(NCOLS[3]);
                for (j = 0; j < NCOLS[3]; j++) {
                    if( j%2==1){
                        bricks3[i][j] = 1;
                    }
                    else if(i%2==0)
                        bricks3[i][j] = 0;
                    else{
                        bricks3[i][j]=1;
                    }
                }
            }

             for (i = 0; i < NROWS[3]; i++) {
                for (j = 0; j < NCOLS[3]; j++) {
                    
                    
                    left_brick[3] +=bricks3[i][j];
                }
            }
        }

        function level4_brick() {
            NROWS[4] = 7;  // 세로블록수
            NCOLS[4] = 9;  // 가로블록수
            PADDING[4] = 0;
            BRICKWIDTH[4] = (WIDTH / NCOLS[4]);
            BRICKHEIGHT[4] = 30;

            bricks4 = new Array(NROWS[4]);
            
           
            for (i = 0; i < NROWS[4]; i++) {
                bricks4[i] = new Array(NCOLS[4]);
                for (j = 0; j < NCOLS[4]; j++) {
                    if(j%2 == 0) {
                        bricks4[i][j] = 1;
                    }
                    else if(i%2 == 0) {
                        bricks4[i][j] = 1;
                    }
                    else {
                        bricks4[i][j] = 0;
                    }
                }
            }

             for (i = 0; i < NROWS[4]; i++) {
                for (j = 0; j < NCOLS[4]; j++) {
                    
                    
                    left_brick[4] +=bricks4[i][j];
                }
            }
        }

        function level5_brick() {
            NROWS[5] = 7; // 세로블록수
            NCOLS[5] = 9;  // 가로블록수
            PADDING[5] = 0;
            BRICKWIDTH[5] = (WIDTH / NCOLS[5]);
            BRICKHEIGHT[5] = 30;

            bricks5 = new Array(NROWS[5]);
            
           
            for (i = 0; i < NROWS[5]; i++) {
                bricks5[i] = new Array(NCOLS[5]);
                for (j = 0; j < NCOLS[5]; j++) {
                    if(i == 0) {
                        bricks5[i][j] = 0;
                    }
                    else if(i == 1) {
                        bricks5[i][j] = 0;
                    }
                    else {
                        bricks5[i][j] = 1;
                    }
                }
            }

             for (i = 0; i < NROWS[5]; i++) {
                for (j = 0; j < NCOLS[5]; j++) {
                   
                    
                    left_brick[5] +=bricks5[i][j];
                }
            }
        }

        function level0(){
            clear();
            ctx.drawImage(lv0,0,0,WIDTH,HEIGHT); 
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);

            //벽돌 그리기
            for (i = 0; i < NROWS[0]; i++) {   //가로
                for (j = 0; j < NCOLS[0]; j++) {
                    if (bricks0[i][j] == 1) {

                        ctx.drawImage(lv0_b,j * BRICKWIDTH[0], i * BRICKHEIGHT[0], BRICKWIDTH[0] - PADDING[0], BRICKHEIGHT[0] - PADDING[0]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;


            if(y<0) y=0;

            //벽돌을 깰떄
            var row = Math.floor( (y+25) / (BRICKHEIGHT[0] + PADDING[0]));
            var col = Math.floor( (x+25) / (BRICKWIDTH[0] + PADDING[0]));
            if (row < NROWS[0]) {
                if (bricks0[row][col] == 1) {
                    dy = -dy;
                    bricks0[row][col] = 0;
                    left_brick[0] -=1;
                    king.src='base_hit.png';
                    cal_score();

                    if(effectSound==true){
                        brick_hit.play();
                    }
                   
                }
            }


            if (x >= WIDTH - radius || x <=  0 - radius ) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';
                }

                dx = -dx;
                if(effectSound==true){
                    wall_hit.play();
                }
                
            }

            if (y <= 0 ) {                      //공이 12시로 갈때
                

                y=HEIGHT-radius;
                level=1;
               
            } 


            else if (y >= HEIGHT - paddle_h) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;


                    king.src='base_middle.png';
                    if(effectSound==true){
                        paddle_hit.play();
                    }
                        
                    
                   
                } else {
                    //Game Over
                    is_gameover = true;
                    open_bgm.pause();
                    alert("GAME OVER");
                    close_canvas();

                }
            }
        }

        function level1(){

            clear();
            ctx.drawImage(lv1,0,0,WIDTH,HEIGHT); 
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);
        
    
            //벽돌 그리기
            for (i = 0; i < NROWS[1]; i++) {   //가로
                for (j = 0; j < NCOLS[1]; j++) {
                    if (bricks1[i][j] == 1) {
                        ctx.drawImage(lv1_b,j * BRICKWIDTH[1], i * BRICKHEIGHT[1], BRICKWIDTH[1] - PADDING[1], BRICKHEIGHT[1] - PADDING[1]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;

            //벽돌을 깰떄

            if(y<=0){
                y=0;
            }

            var row = Math.floor( (y+25) / (BRICKHEIGHT[1] + PADDING[1]));
            var col = Math.floor( (x+25) / (BRICKWIDTH[1] + PADDING[1]));
            if (row < NROWS[1]) {
                if (bricks1[row][col] == 1) {
                    dy = -dy;
                    bricks1[row][col] = 0;
                    left_brick[1] -=1;
                    king.src='base_hit.png';
                    cal_score();

                    if(effectSound==true)
                    brick_hit.play();
                }
            }


            if (x >= WIDTH - radius || x <= 0 - radius) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';
                }
                dx = -dx;

                if(effectSound==true)
                wall_hit.play();
            }

            if (y <= 0) {                      //공이 12시로 갈때

                if(choose_level==1){
                    dy = -dy;

                    if(effectSound==true)
                    wall_hit.play();

                }

                else{
                    level=2;
                    y=HEIGHT-radius;
                   
                }
               
                
               
            } 

            else if (y >= HEIGHT - paddle_h ) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;
                    king.src='base_middle.png';
                    if(effectSound==true)
                        paddle_hit.play();
                }
                else{
                    y=radius+1;
                    level=0;
                }
            }
        }

        function level2(){

            clear();
            ctx.drawImage(lv2,0,0,WIDTH,HEIGHT);  
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);
        
    
            //벽돌 그리기
            for (i = 0; i < NROWS[2]; i++) {   //가로
                for (j = 0; j < NCOLS[2]; j++) {
                    if (bricks2[i][j] == 1) {
                        ctx.drawImage(lv2_b,j * BRICKWIDTH[2], i * BRICKHEIGHT[2], BRICKWIDTH[2] - PADDING[2], BRICKHEIGHT[2] - PADDING[2]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;

             if(y<=0){
                y=0;
            }

            //벽돌을 깰떄
            var row = Math.floor( (y+25) / (BRICKHEIGHT[2] + PADDING[2]));
            var col = Math.floor( (x+25) / (BRICKWIDTH[2] + PADDING[2]));
            if (row < NROWS[2]) {
                if (bricks2[row][col] == 1) {
                    dy = -dy;
                    bricks2[row][col] = 0;
                    left_brick[2] -=1;
                    king.src='base_hit.png';
                    cal_score();
                    if(effectSound==true)
                    brick_hit.play();
                }
            }


            if (x >= WIDTH - radius || x <= 0 - radius) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';
                }
                dx = -dx;
                if(effectSound==true)
                 wall_hit.play();
            }

            if (y <= 0) {                      //공이 12시로 갈때


               
                    y=HEIGHT-radius;
                    level=3;

                
               
                
               
            } 

            else if (y >= HEIGHT - paddle_h ) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;
                    king.src='base_middle.png';

                    if(effectSound==true)
                        paddle_hit.play();
                }
                else{
                    y=radius+1;
                    level=1;
                }
            }
        }

        function level3(){

            clear();
            ctx.drawImage(lv3,0,0,WIDTH,HEIGHT);
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);
        
    
            //벽돌 그리기
            for (i = 0; i < NROWS[3]; i++) {   //가로
                for (j = 0; j < NCOLS[3]; j++) {
                    if (bricks3[i][j] == 1) {
                        ctx.drawImage(lv3_b,j * BRICKWIDTH[3], i * BRICKHEIGHT[3], BRICKWIDTH[3] - PADDING[3], BRICKHEIGHT[3] - PADDING[3]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;

            
            if(y<=0){
                y=0;
            }

            //벽돌을 깰떄
            var row = Math.floor( (y+25) / (BRICKHEIGHT[3] + PADDING[3]));
            var col = Math.floor( (x+25) / (BRICKWIDTH[3] + PADDING[3]));
            if (row < NROWS[3]) {
                if (bricks3[row][col] == 1) {
                    dy = -dy;
                    bricks3[row][col] = 0;
                    left_brick[3] -=1;
                    king.src='base_hit.png';
                    cal_score();
                    if(effectSound==true)
                        brick_hit.play();
                }
            }


            if (x >= WIDTH - radius || x <= 0 - radius) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';
                }
                dx = -dx;
                if(effectSound==true)
                 wall_hit.play();
            }

            if (y <= 0) {                      //공이 12시로 갈때

               
                 if(choose_level==2){
                    dy = -dy;
                    if(effectSound==true)
                    wall_hit.play();

                }

                else if(choose_level==3){
                    level=4;
                    y=HEIGHT-radius;
                   
                }

                
               
                
               
            } 


            else if (y >= HEIGHT - paddle_h ) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;
                    king.src='base_middle.png';
                    if(effectSound==true)
                        paddle_hit.play();
                }
                else{
                    y=radius+1;
                    level=2;
                }
            }
        }

        function level4(){

            clear();
            ctx.drawImage(lv4,0,0,WIDTH,HEIGHT);  
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);
        
    
            //벽돌 그리기
            for (i = 0; i < NROWS[4]; i++) {   //가로
                for (j = 0; j < NCOLS[4]; j++) {
                    if (bricks4[i][j] == 1) {
                        ctx.drawImage(lv4_b,j * BRICKWIDTH[4], i * BRICKHEIGHT[4], BRICKWIDTH[4] - PADDING[4], BRICKHEIGHT[4] - PADDING[4]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;

             if(y<=0){
                y=0;
            }

            //벽돌을 깰떄
            var row = Math.floor( (y+25) / (BRICKHEIGHT[4] + PADDING[4]));
            var col = Math.floor( (x+25) / (BRICKWIDTH[4] + PADDING[4]));
            if (row < NROWS[4]) {
                if (bricks4[row][col] == 1) {
                    dy = -dy;
                    bricks4[row][col] = 0;
                    left_brick[4] -=1;
                    king.src='base_hit.png';
                    cal_score();
                    if(effectSound==true)
                        brick_hit.play();
                }
            }


            if (x >= WIDTH - radius || x <= 0 - radius) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';
                }
                dx = -dx;
                if(effectSound==true)
                 wall_hit.play();
            }

            if (y <= 0) {                      //공이 12시로 갈때


               
                    y=HEIGHT-radius;
                    level=5;

                
               
                
               
            } 


            else if (y >= HEIGHT - paddle_h ) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;
                    king.src='base_middle.png';
                    if(effectSound==true)
                        paddle_hit.play();
                }
                else{
                    y=radius+1;
                    level=3;
                }
            }
        }

        function level5(){

            clear();
            ctx.drawImage(lv5,0,0,WIDTH,HEIGHT);
            king_b(x, y, radius);
            draw_paddle(paddle_x, HEIGHT - paddle_h, paddle_w, paddle_h);

            if(k==0){
                is_clear=true;
            }
        
    
            //벽돌 그리기
            for (i = 0; i < NROWS[5]; i++) {   //가로
                for (j = 0; j < NCOLS[5]; j++) {
                    if (bricks5[i][j] == 1) {
                        ctx.drawImage(lv5_b,j * BRICKWIDTH[5], i * BRICKHEIGHT[5], BRICKWIDTH[5] - PADDING[5], BRICKHEIGHT[5] - PADDING[5]); 
                        //  (x의 시작점, y의 시작점, 가로길이, 세로길이)
                    }
                }
            }

            if (is_leftPannel && paddle_x > 0) {
                paddle_x -= 5;
            }
            if (is_rightPannel && paddle_x + paddle_w < WIDTH) {
                paddle_x += 5;
            }

            x += dx;
            y += dy;

            
            if(y<=0){
                y=0;
            }

            //벽돌을 깰떄
            var row = Math.floor(y / (BRICKHEIGHT[5] + PADDING[5]));
            var col = Math.floor(x / (BRICKWIDTH[5] + PADDING[5]));
            if (row < NROWS[5]) {
                if (bricks5[row][col] == 1) {
                    dy = -dy;
                    bricks5[row][col] = 0;
                    left_brick[5] -=1;
                    king.src='base_hit.png';
                    cal_score();
                    if(effectSound==true)
                        brick_hit.play();
                }
            }


            if (x >= WIDTH - radius || x <= 0 - radius) { // 공이 3시로 가거나 9시로 갈때

                if(x>=WIDTH - radius){
                    king.src='base_left.png';
                }
                else{
                    king.src='base_right.png';

                }
                dx = -dx;
                if(effectSound==true)
                 wall_hit.play();
            }

            if (y <= 0) {                      //공이 12시로 갈때

               
                if(is_clear==false){

                    dy = -dy;
                    if(effectSound==true)
                    wall_hit.play();

                }

                else{
                    dx=0;
                    dy=0;

                    x_6=x;
                    y=HEIGHT-radius;
                    y_6=y;

                    x_6=(175-x)/1000;
                    y_6=(60-y)/1000;

                    level=6;
                }

       
                
               
            } 


            else if (y >= HEIGHT - paddle_h ) {           //공이 6시로 갈때

                if (x > paddle_x- radius && x < paddle_x + paddle_w+ radius) {   //공이 패달을 만났을때

                    dx = -((paddle_x + (paddle_w/2) - x)/(paddle_w)) * 10;
                    dy = -dy;
                    king.src='base_middle.png';
                    if(effectSound==true)
                    paddle_hit.play();
                }
                else{
                    y=radius+1;
                    level=4;
                }
            }
        }
 
        var m=0;
        function level6(){
            m++;
            if(m<1000){
            x=x+x_6;
            y=y+y_6;

            }

            else if(m==1000){
                king.src="base_end.png";
            }

            else if(m>1000&&m<1300){
                x=x+1;
            }

            else{
                show_ending=true;
            }
            

             ctx.drawImage(lv6,0,0,WIDTH,HEIGHT);
             king_b(x,y,radius);




        }


  
        $(document).on('keydown', function(e) {
            if (e.which == 37) {   //<-
                is_leftPannel = true;
            } else if (e.which == 39) { //->
                is_rightPannel = true;
            }
        });

        $(document).on('keyup', function(e) {
            if (e.which == 37) {   
                is_leftPannel = false;
            } else if (e.which == 39) {
                is_rightPannel = false;
            }
        });



});