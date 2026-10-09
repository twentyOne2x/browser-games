// Modified 2026-10-09: captured drag input. GPL-2.0.
IN = {};

IN.touch_forward = IN.touch_side = 0;
IN.mouse_x = 0.0;
IN.mouse_y = 0.0;
IN.old_mouse_x = 0.0;
IN.old_mouse_y = 0.0;

IN.StartupMouse = function()
{
 IN.m_filter = Cvar.RegisterVariable('m_filter', '0');
 IN.mouse_avail = true;
 Game.bindInputs();
};
IN.Init = function() { IN.StartupMouse(); };
IN.Shutdown = function() { Game.releaseAll(); };

IN.MouseMove = function()
{
	if (IN.mouse_avail !== true)
		return;

	var mouse_x, mouse_y;
	if (IN.m_filter.value !== 0)
	{
		mouse_x = (IN.mouse_x + IN.old_mouse_x) * 0.5;
		mouse_y = (IN.mouse_y + IN.old_mouse_y) * 0.5;
	}
	else
	{
		mouse_x = IN.mouse_x;
		mouse_y = IN.mouse_y;
	}
	IN.old_mouse_x = IN.mouse_x;
	IN.old_mouse_y = IN.mouse_y;
	mouse_x *= CL.sensitivity.value;
	mouse_y *= CL.sensitivity.value;

	var strafe = CL.kbuttons[CL.kbutton.strafe].state & 1;
	var mlook = CL.kbuttons[CL.kbutton.mlook].state & 1;
	var angles = CL.state.viewangles;

	if ((strafe !== 0) || ((CL.lookstrafe.value !== 0) && (mlook !== 0)))
		CL.state.cmd.sidemove += CL.m_side.value * mouse_x;
	else
		angles[1] -= CL.m_yaw.value * mouse_x;

	if (mlook !== 0)
		V.StopPitchDrift();

	if ((mlook !== 0) && (strafe === 0))
	{
		angles[0] += CL.m_pitch.value * mouse_y;
		if (angles[0] > 80.0)
			angles[0] = 80.0;
		else if (angles[0] < -70.0)
			angles[0] = -70.0;
	}
	else
	{
		if ((strafe !== 0) && (Host.noclip_anglehack === true))
			CL.state.cmd.upmove -= CL.m_forward.value * mouse_y;
		else
			CL.state.cmd.forwardmove -= CL.m_forward.value * mouse_y;
	}
	
	IN.mouse_x = IN.mouse_y = 0;
};

IN.Move = function()
{
	IN.MouseMove();
 CL.state.cmd.forwardmove += IN.touch_forward * CL.forwardspeed.value;
 CL.state.cmd.sidemove += IN.touch_side * CL.sidespeed.value;
};

