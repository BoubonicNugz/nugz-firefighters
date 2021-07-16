import { Config, Delay } from "../config/config"
import * as NativeUI from "./nativeui/nativeui"

// Set up QBCore
let QBCore: any = null
emit("QBCore:GetObject", (o: any) => QBCore = o)

// Vars
const Menu: any = new NativeUI.Menu("Firehouse Garage", "", new NativeUI.Point(50,50))
let pJob: any = QBCore.Functions.GetPlayerData().job || null
let closestFirehouse: number

// Set up timers to draw markers at the different locations
// -----
setTick( async(): Promise<void> => {
  // -- Odd behavior seen, this is a 'just in case' check that shoudn't fire under normal circumstances
  // -- but it's here incase QBCore is still null.
  if(QBCore === null) { emit("QBCore:GetObject", (o: any) => QBCore = o) }

  // Tick Vars
  let inRange = false
  closestFirehouse = null
  pJob = QBCore.Functions.GetPlayerData().job

  // Check to see if user as the whitelisted job "fire", you can change this to any whitelisted job
  // and use this script as a framework to create more whitelisted jobs
  if (pJob.name === "fire") {

    // Inner Tick Vars
    let dist: number
    const pPos: number[] = GetEntityCoords(PlayerPedId(), false)

    // Loop through Config.Loations
    Object.keys(Config.Locations).forEach( (_i: string, k: number): void => {
      // -----
      // Duty Markers
      // -----      
      
      // Get distance between player and marker coords
      dist = Vdist2(
        pPos[0], pPos[1], pPos[2], 
        Config.Locations[k].duty.x, Config.Locations[k].duty.y, Config.Locations[k].duty.z 
      )

      // Player is close
      if(dist <= Config.Locations[k].duty.r) {
        inRange = true

        // Arrow Marker
        DrawMarker(2, Config.Locations[k].duty.x, Config.Locations[k].duty.y, Config.Locations[k].duty.z,
          0,0,0,0,0,0,0.3,0.2,0.15,200,0,0,222,false, false, 2, true, null, null, false)

        // Player is really close
        if(dist < 2) {
          // And on duty
          if(pJob.onduty) {
            DrawText3Ds(Config.Locations[k].duty.x, Config.Locations[k].duty.y, Config.Locations[k].duty.z, "[~g~E~w~] Go Off Duty")
          } else {
            DrawText3Ds(Config.Locations[k].duty.x, Config.Locations[k].duty.y, Config.Locations[k].duty.z, "[~g~E~w~] Go On Duty")
          }

          // E Pressed?
          if( IsControlJustReleased(0,38) ) {
            emitNet("QBCore:ToggleDuty")
          }
        }
      }

      // -----
      // Garage Markers
      // -----
      dist = Vdist2(
        pPos[0], pPos[1], pPos[2], 
        Config.Locations[k].garage.x, Config.Locations[k].garage.y, Config.Locations[k].garage.z 
      )

      if(dist <= 10) {
        inRange = true
        closestFirehouse = k
        const inVehicle = IsPedInAnyVehicle(PlayerPedId(), false)

        DrawMarker(2, Config.Locations[k].garage.x, Config.Locations[k].garage.y, Config.Locations[k].garage.z,
        0,0,0,0,0,0,0.3,0.2,0.15,200,0,0,222,false, false, 2, true, null, null, false)

        if(dist < 2) {
          if(pJob.onduty) {
            if(!inVehicle || inVehicle == 0) {
              DrawText3Ds(Config.Locations[k].garage.x, Config.Locations[k].garage.y, Config.Locations[k].garage.z, "[~g~E~w~] Access Garage")
            } else {
              DrawText3Ds(Config.Locations[k].garage.x, Config.Locations[k].garage.y, Config.Locations[k].garage.z, "[~g~E~w~] Park Vehicle")
            }
          }

          if( IsControlJustReleased(0,38) ) {
            if(inVehicle && inVehicle != 0) {
              QBCore.Functions.DeleteVehicle(GetVehiclePedIsIn(PlayerPedId(), false))
            } else {
              // NativeUI implementation in JS
              Object.keys(Config.Vehicles).forEach( (_i: string, k: number): void => {
                Menu.AddItem( new NativeUI.UIMenuItem(Config.Vehicles[k].name, "", { model: Config.Vehicles[k].model, garage: closestFirehouse}) )
              })
              Menu.AddItem( new NativeUI.UIMenuItem("Close Garage", "", "close") )
              Menu.Open()
            }
          }
        }
      } else if(Menu.Visible && closestFirehouse != null) {
        dist = Vdist2(pPos[0], pPos[1], pPos[2],Config.Locations[closestFirehouse].garage.x, Config.Locations[closestFirehouse].garage.y, Config.Locations[closestFirehouse].garage.z)
        if(dist > 10) { 
          Menu.Close() 
        }
      }
      
      // -----
      // Stash(Armory) Markers
      // -----
      dist = Vdist2(pPos[0], pPos[1], pPos[2], Config.Locations[k].stash.x, Config.Locations[k].stash.y, Config.Locations[k].stash.z)

      if(dist <= 10) {
        inRange = true
        DrawMarker(2, Config.Locations[k].stash.x, Config.Locations[k].stash.y, Config.Locations[k].stash.z,
        0,0,0,0,0,0,0.3,0.2,0.15,200,0,0,222,false, false, 2, true, null, null, false)

        if(dist < 2) {
          DrawText3Ds(Config.Locations[k].stash.x, Config.Locations[k].stash.y, Config.Locations[k].stash.z, "[~g~E~w~] Access Armory")

          if( IsControlJustReleased(0,38) ) {
            emitNet("inventory:server:OpenInventory", "shop", "fire", Config.Items)
          }
        }
      }

      // -----
      // BossMenu Markers
      // -----
      dist = Vdist2(pPos[0], pPos[1], pPos[2], Config.Locations[k].boss.x, Config.Locations[k].boss.y, Config.Locations[k].boss.z)

      if(dist <= 10 && pJob.isboss === true) {
        inRange = true
        DrawMarker(2, Config.Locations[k].boss.x, Config.Locations[k].boss.y, Config.Locations[k].boss.z,
        0,0,0,0,0,0,0.3,0.2,0.15,200,0,0,222,false, false, 2, true, null, null, false)

        if(dist < 2) {
          DrawText3Ds(Config.Locations[k].boss.x, Config.Locations[k].boss.y, Config.Locations[k].boss.z, "[~g~E~w~] Human Resources")

          if( IsControlJustReleased(0,38) ) {
            emitNet("cash_bossmenu:server:openMenu")
          }
        }
      }      
    })
  } else {
    await Delay(60000)
  }

  if(!inRange) {
    await Delay(2000)
  }
})

Menu.ItemSelect.on((selectedItem: NativeUI.UIMenuItem) => {
  if(selectedItem.Data === "close") { Menu.Close() }
  else {
    QBCore.Functions.SpawnVehicle(selectedItem.Data.model, (v: number) => {
      SetVehicleNumberPlateText(v, "FIRE" + RandNum(1111,2222).toString())
      SetEntityHeading(v, Config.Locations[selectedItem.Data.garage].garage.h)
      SetVehicleFuelLevel(v, 100.0)
      DecorSetFloat(v, "_FUEL_LEVEL", GetVehicleFuelLevel(v))
      TaskWarpPedIntoVehicle(PlayerPedId(), v, -1)
      emit("vehiclekeys:client:SetOwner", GetVehicleNumberPlateText(v))
      SetVehicleEngineOn(v, true, true, false)
      Menu.Close()
    }, Config.Locations[selectedItem.Data.garage].garage, true)
  }
})

const RandNum = function(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Converted DrawText3Ds function
const DrawText3Ds = function(x: number, y: number, z: number, text: string): void {
	SetTextScale(0.35, 0.35)
  SetTextFont(4)
  SetTextProportional(false)
  SetTextColour(255, 255, 255, 215)
  SetTextEntry("STRING")
  SetTextCentre(true)
  AddTextComponentString(text)
  SetDrawOrigin(x,y,z, 0)
  DrawText(0.0, 0.0)
  const factor: number = (text.length) / 370
  DrawRect(0.0, 0.0+0.0125, 0.017+ factor, 0.03, 0, 0, 0, 75)
  ClearDrawOrigin()
}