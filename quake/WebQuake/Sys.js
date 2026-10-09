// Modified 2026-10-09: frame-safe lifecycle and keyboard input. GPL-2.0.
Sys = {};
Sys.Print = function(text) { console.log(text); };
Sys.FloatTime = function() { return performance.now() / 1000 - Sys.oldtime; };
Sys.Quit = function() { Game.returnToStart(); };
Sys.Error = function(text) { Game.fail(/WebGL/.test(text)?'WebGL unavailable':'Game unavailable'); const error=new Error(text); error.reported=true; throw error; };
Sys.Init = function() {
 Q.isNaN = Number.isNaN;
 COM.InitArgv(['index.html', '-nocdaudio']);
 VID.width = 640; VID.height = 480;
	Sys.scantokey = [];
	Sys.scantokey[8] = Key.k.backspace;
	Sys.scantokey[9] = Key.k.tab;
	Sys.scantokey[13] = Key.k.enter;
	Sys.scantokey[16] = Key.k.shift;
	Sys.scantokey[17] = Key.k.ctrl;
	Sys.scantokey[18] = Key.k.alt;
	Sys.scantokey[19] = Key.k.pause;
	Sys.scantokey[27] = Key.k.escape;
	Sys.scantokey[32] = Key.k.space;
	Sys.scantokey[33] = Sys.scantokey[105] = Key.k.pgup;
	Sys.scantokey[34] = Sys.scantokey[99] = Key.k.pgdn;
	Sys.scantokey[35] = Sys.scantokey[97] = Key.k.end;
	Sys.scantokey[36] = Sys.scantokey[103] = Key.k.home;
	Sys.scantokey[37] = Sys.scantokey[100] = Key.k.leftarrow;
	Sys.scantokey[38] = Sys.scantokey[104] = Key.k.uparrow;
	Sys.scantokey[39] = Sys.scantokey[102] = Key.k.rightarrow;
	Sys.scantokey[40] = Sys.scantokey[98] = Key.k.downarrow;
	Sys.scantokey[45] = Sys.scantokey[96] = Key.k.ins;
	Sys.scantokey[46] = Sys.scantokey[110] = Key.k.del;
	for (i = 48; i <= 57; ++i)
		Sys.scantokey[i] = i; // 0-9
	Sys.scantokey[59] = Sys.scantokey[186] = 59; // ;
	Sys.scantokey[61] = Sys.scantokey[187] = 61; // =
	for (i = 65; i <= 90; ++i)
		Sys.scantokey[i] = i + 32; // a-z
	Sys.scantokey[106] = 42; // *
	Sys.scantokey[107] = 43; // +
	Sys.scantokey[109] = Sys.scantokey[173] = Sys.scantokey[189] = 45; // -
	Sys.scantokey[111] = Sys.scantokey[191] = 47; // /
	for (i = 112; i <= 123; ++i)
		Sys.scantokey[i] = i - 112 + Key.k.f1; // f1-f12
	Sys.scantokey[188] = 44; // ,
	Sys.scantokey[190] = 46; // .
	Sys.scantokey[192] = 96; // `
	Sys.scantokey[219] = 91; // [
	Sys.scantokey[220] = 92; // backslash
	Sys.scantokey[221] = 93; // ]
	Sys.scantokey[222] = 39; // '

 Sys.oldtime = performance.now() / 1000;
 Host.Init();
 Cmd.Execute();
 CL.cls.demonum = -1; Host.startdemos = false;
 Game.configure();
};
window.addEventListener('load', function() { Game.load(); });
