import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Key, Globe, Zap, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";

const GoogleMapsInstructions: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isConfigured = apiKey && apiKey !== "demo_key_disabled" && apiKey !== "YOUR_GOOGLE_MAPS_API_KEY_HERE";

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Google Maps Integration
          </span>
          <Badge variant={isConfigured ? "default" : "secondary"} className="flex items-center">
            {isConfigured ? (
              <>
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Demo Mode
              </>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConfigured ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Google Maps API not configured.</strong> The app is running in demo mode with a fallback map interface. 
              To enable live Google Maps tracking, you need to set up a Google Maps API key.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Google Maps is configured!</strong> You can now view live tracking with interactive maps, 
              real-time location updates, and detailed route information.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Key className="h-4 w-4 mr-2" />
              Setup Instructions
            </h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-start">
                <span className="font-medium text-blue-600 mr-2">1.</span>
                <span>Get a Google Maps API key from Google Cloud Console</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-blue-600 mr-2">2.</span>
                <span>Enable the Maps JavaScript API</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-blue-600 mr-2">3.</span>
                <span>Set the environment variable VITE_GOOGLE_MAPS_API_KEY</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-blue-600 mr-2">4.</span>
                <span>Restart the development server</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Features Available
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>Interactive donation tracking</span>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>Real-time volunteer locations</span>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>Route optimization & directions</span>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>Live delivery tracking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open("https://console.cloud.google.com/google/maps-apis/", "_blank")}
          >
            <Globe className="h-3 w-3 mr-1" />
            Google Cloud Console
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open("https://developers.google.com/maps/documentation/javascript/get-api-key", "_blank")}
          >
            <Key className="h-3 w-3 mr-1" />
            API Key Guide
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {!isConfigured && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Current Status:</strong> Using fallback map with mock data. 
              All tracking features are functional, but without real Google Maps integration.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMapsInstructions;
