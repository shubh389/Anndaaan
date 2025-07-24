import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  User,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Donation, Volunteer } from "./DonationMap";

interface FallbackMapProps {
  donations: Donation[];
  volunteers: Volunteer[];
  selectedDonation?: string;
  onDonationSelect: (donationId: string) => void;
  className?: string;
}

const FallbackMap: React.FC<FallbackMapProps> = ({
  donations,
  volunteers,
  selectedDonation,
  onDonationSelect,
  className,
}) => {
  const getStatusColor = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "assigned":
        return "bg-blue-500";
      case "in_transit":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: Donation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "assigned":
        return <User className="h-4 w-4" />;
      case "in_transit":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const getTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Fallback Map Display */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold">
              Tracking Interface
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Simplified Mode
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 rounded-lg border overflow-hidden">
              {/* Google Maps Interface - Click to open maps.google.com */}
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc8e502a783604533b5c478ab95726ead%2Fdf20984a15e54a7e8cc83957fbfad2cb?format=webp&width=800"
                  alt="Google Maps"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />

                {/* Live Tracking Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top Right - Live Status */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-green-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Live Tracking</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Updated: {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Top Left - Quick Actions */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-xs font-medium text-gray-700 mb-2">Quick Actions</div>
                      <div className="flex flex-col space-y-1">
                        <button className="pointer-events-auto text-xs text-blue-600 hover:text-blue-800 text-left">
                          🔍 Find Donation
                        </button>
                        <button className="pointer-events-auto text-xs text-orange-600 hover:text-orange-800 text-left">
                          📍 Track Route
                        </button>
                        <button className="pointer-events-auto text-xs text-green-600 hover:text-green-800 text-left">
                          👥 Contact Volunteer
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Center - Active Tracking Info */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-700 mb-2">Active Tracking</div>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{donations.filter(d => d.status === 'in_transit').length}</div>
                            <div className="text-gray-600">En Route</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-orange-600">{volunteers.filter(v => v.isAvailable).length}</div>
                            <div className="text-gray-600">Available</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">{donations.filter(d => d.status === 'delivered').length}</div>
                            <div className="text-gray-600">Delivered</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Click to Open Maps Hint */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="bg-blue-500/90 text-white rounded-lg p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Click to open Google Maps
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Details Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Donations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                  selectedDonation === donation.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200",
                )}
                onClick={() => onDonationSelect(donation.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        getStatusColor(donation.status),
                      )}
                    ></div>
                    <span className="font-medium text-sm">
                      {donation.donorName}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center text-xs"
                  >
                    {getStatusIcon(donation.status)}
                    <span className="ml-1 capitalize">
                      {donation.status.replace("_", " ")}
                    </span>
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    <span>{donation.foodQuantity}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">
                      {donation.location.address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Expires in {getTimeRemaining(donation.expiryTime)}
                    </span>
                  </div>
                </div>

                {donation.volunteer && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                    <div className="font-medium">
                      Volunteer: {donation.volunteer.name}
                    </div>
                    {donation.volunteer.estimatedArrival && (
                      <div className="text-gray-600">
                        ETA:{" "}
                        {new Date(
                          donation.volunteer.estimatedArrival,
                        ).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {donations.length}
                </div>
                <div className="text-xs text-gray-600">Total Donations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {volunteers.filter((v) => v.isAvailable).length}
                </div>
                <div className="text-xs text-gray-600">
                  Available Volunteers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {donations.filter((d) => d.status === "in_transit").length}
                </div>
                <div className="text-xs text-gray-600">Active Deliveries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    (donations.filter((d) => d.status === "delivered").length /
                      donations.length) *
                      100,
                  ) || 0}
                  %
                </div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FallbackMap;
