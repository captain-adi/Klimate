import React, { type ChangeEvent } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useSearchLocation } from "@/hooks/useWeather";

function CitySearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const { data: locations, isLoading, isError } = useSearchLocation(query);
  console.log("lcation data: ", locations);
  const handleSelect = (value: string) => {};
  return (
    <>
      <Button
        className="flex justify-start text-muted-foreground gap-2 md:gap-4  md:w-40 lg:w-64"
        variant={"outline"}
        onClick={() => setOpen(true)}
      >
        {" "}
        <Search /> Search cites ...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a city name or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>{isLoading && "No city found."}</CommandEmpty>
          
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <span className="text-sm text-muted-foreground">
                      Loading...
                    </span>
                  </div>
                )}
                {locations?.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                      , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>)}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default CitySearch;
