-- GPL-2.0. Passive proof observer. Does not change any engine state.
local turns = 0
local shots = 0
local bee = nil
local function state(event)
    if CurrentHedgehog == nil then return end
    local x, y = GetGearPosition(CurrentHedgehog)
    local target = ''
    if bee ~= nil then
        local tx, ty = GetGearTarget(bee)
        target = ',"targetX":' .. tx .. ',"targetY":' .. ty
    end
    WriteLnToConsole('PLAY_STATE {"event":"' .. event .. '","team":"' .. GetHogTeamName(CurrentHedgehog) .. '","hog":' .. CurrentHedgehog ..
        ',"x":' .. x .. ',"y":' .. y .. ',"turns":' .. turns .. ',"shots":' .. shots ..
        ',"ammo":' .. GetCurAmmoType() .. ',"chooseTarget":' .. tostring(band(GetState(CurrentHedgehog),gstChooseTarget) ~= 0) ..
        ',"cursorX":' .. CursorX .. ',"cursorY":' .. CursorY .. target .. '}')
end
function onNewTurn()
    turns = turns + 1
    state('turn')
end
function onGameTick20()
    state('tick')
end
function onGearAdd(gear)
    local kind = GetGearType(gear)
    if kind == gtBee then bee = gear end
    if kind == gtShell or kind == gtGrenade or kind == gtClusterBomb or kind == gtBee then
        shots = shots + 1
        state('projectile')
    end
end
function onGearDelete(gear)
    if gear == bee then bee = nil end
end
