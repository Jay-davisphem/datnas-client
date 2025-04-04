'use client'
import ContactInfo from "@/app/ui/body/home/ContactInfo";
import GetInTouch from "@/app/ui/body/home/GetInTouch";
import {  LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'

export default function Contact() {
  const position = [51.505, -0.09] as LatLngExpression;
  return (
    <div className="flex flex-col">
      <ContactInfo />
      <GetInTouch />
    </div>
  )
}
