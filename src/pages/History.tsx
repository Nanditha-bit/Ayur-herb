import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, RefreshCw, CloudOff, Cloud, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { format } from "date-fns";

const History = () => {
  const navigate = useNavigate();
  const {
    identifiedPlants,
    isOnline,
    isSyncing,
    deletePlant,
    syncToServer,
    getUnsyncedCount,
    refreshPlants,
  } = useOfflineStorage();

  useEffect(() => {
    refreshPlants();
  }, []);

  const unsyncedCount = getUnsyncedCount();

  return (
    <div className="min-h-screen bg-gradient-earth py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Database
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Identification History</h1>
              <p className="text-lg text-muted-foreground">
                Your offline plant identification records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? "default" : "secondary"}>
                {isOnline ? (
                  <>
                    <Cloud className="h-3 w-3 mr-1" />
                    Online
                  </>
                ) : (
                  <>
                    <CloudOff className="h-3 w-3 mr-1" />
                    Offline
                  </>
                )}
              </Badge>
              {unsyncedCount > 0 && (
                <Badge variant="outline">
                  {unsyncedCount} unsynced
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              onClick={syncToServer}
              disabled={!isOnline || isSyncing || unsyncedCount === 0}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
            <Button
              variant="outline"
              onClick={refreshPlants}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {identifiedPlants.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
              <p className="text-muted-foreground mb-4">
                Identified plants will appear here
              </p>
              <Button onClick={() => navigate("/")}>
                Start Identifying Plants
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {identifiedPlants.map((plant) => (
              <Card key={plant.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary">
                        {plant.sanskritName}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        {plant.botanicalName}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={plant.synced ? "default" : "secondary"}>
                        {plant.synced ? (
                          <>
                            <Cloud className="h-3 w-3 mr-1" />
                            Synced
                          </>
                        ) : (
                          <>
                            <CloudOff className="h-3 w-3 mr-1" />
                            Local
                          </>
                        )}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlant(plant.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    {plant.imageData && (
                      <img
                        src={plant.imageData}
                        alt={plant.sanskritName}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Confidence:</span>
                        <Badge variant="outline">
                          {Math.round(plant.confidence * 100)}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {format(new Date(plant.timestamp), 'PPpp')}
                      </div>
                      {plant.plantId && (
                        <Button
                          variant="link"
                          className="p-0 h-auto"
                          onClick={() => {
                            navigate(`/?plant=${plant.plantId}`);
                          }}
                        >
                          View in Database
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isOnline && identifiedPlants.length > 0 && (
          <Card className="mt-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <CloudOff className="h-4 w-4" />
                Offline Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You are currently offline. All identified plants are stored locally 
                and will be synced when you reconnect to the internet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;
