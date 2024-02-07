#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <algorithm>

struct MapItem
{
  long source;
  long dest;
  long rangeLength;
};

std::vector<std::string> processLineByLine(const std::string &filename)
{
  std::ifstream fileStream(filename);
  std::vector<std::string> contents;
  std::string line;

  while (std::getline(fileStream, line))
  {
    contents.push_back(line);
  }

  return contents;
}

std::vector<long> getDestinations(const std::vector<long> &sources, std::vector<MapItem> &map)
{
  std::sort(map.begin(), map.end(), [](const MapItem &a, const MapItem &b)
            { return b.source < a.source; });

  std::vector<long> destinations;
  for (long currSource : sources)
  {
    for (const MapItem &combination : map)
    {
      if (combination.source <= currSource)
      {
        if (combination.source + combination.rangeLength - 1 >= currSource)
        {
          destinations.push_back(combination.dest + currSource - combination.source);
        }
        else
        {
          destinations.push_back(currSource);
        }
        break;
      }
    }

    destinations.push_back(currSource);
  }

  return destinations;
}

std::vector<long> getLocations(const std::vector<long> &seeds, const std::vector<std::string> &contents)
{
  std::vector<long> currentSources = seeds;
  std::vector<MapItem> map;

  for (const std::string &line : contents)
  {
    if (line.empty())
    {
      currentSources = getDestinations(currentSources, map);
      map.clear();
      continue;
    }

    char firstChar = line[0];

    if (!isdigit(firstChar))
    {
      continue;
    }

    std::istringstream iss(line);
    long destStart, sourceStart, rangeLength;
    iss >> destStart >> sourceStart >> rangeLength;

    map.push_back({sourceStart, destStart, rangeLength});

    if (&line == &contents.back())
    {
      currentSources = getDestinations(currentSources, map);
    }
  }

  return currentSources;
}

long getLowestLocation(const std::vector<std::string> &contents)
{
  const std::string &firstLine = contents[0];
  std::istringstream firstLineStream(firstLine);

  std::string dummy;
  firstLineStream >> dummy; // skip the first part

  std::vector<long> seedsRanges;
  long initialValue;
  long range;
  while (firstLineStream >> initialValue >> range)
  {
    seedsRanges.push_back(initialValue);
    seedsRanges.push_back(range);
  }

  long lowestLocation = LONG_MAX;
  long nOperations = 0;

  for (size_t i = 0; i < seedsRanges.size(); i += 2)
  {
    long initialValue = seedsRanges[i];
    long rangeLength = seedsRanges[i + 1];

    std::cout << initialValue << " " << rangeLength << std::endl;

    for (long j = 0; j < rangeLength; j++)
    {
      std::vector<long> seeds = {initialValue + j};
      std::vector<long> locations = getLocations(seeds, std::vector<std::string>(contents.begin() + 3, contents.end()));
      nOperations++;

      if (nOperations % 100000 == 0)
      {
        std::cout << nOperations << " " << i << " " << j << std::endl;
      }
      if (lowestLocation > locations[0])
      {
        lowestLocation = locations[0];
      }
    }
  }

  return lowestLocation;
}

int main()
{
  const std::string filename = "input.txt";
  std::vector<std::string> contents = processLineByLine(filename);
  long lowestLocation = getLowestLocation(contents);

  std::cout << "{ lowestLocation: " << lowestLocation << " }" << std::endl;

  return 0;
}