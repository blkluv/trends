import { Trend } from "../interfaces/trend";

interface AuthorTotals{
  [key: string]: number;
}
export const mostAuthoredTrend = (trends: Trend[]): string => {
  if(!trends || trends.length === 0) return '';
  
  const totaledByAuthor = setTotalTrendsPerAuthor(trends); // {Dickens: 100, Jane: 2, Luke: 0...}

  return findMaxTrendsCreatedAuthor(totaledByAuthor); // 'Dickens'
  }

  // Helpers
  const setTotalTrendsPerAuthor = (trends: Trend[]) => {
    const totaledByAuthor: AuthorTotals = {};
    // Total up number of trends per author
    for(const index in trends){
      const authorName = trends[index].author;
      if(!totaledByAuthor[authorName])
        totaledByAuthor[authorName] = 1;
      else
        totaledByAuthor[authorName] += 1;
    }

   return totaledByAuthor;
  }
  
  const findMaxTrendsCreatedAuthor = (authorNameAndValue: AuthorTotals) => {
  let maxTrendsCreatedAuthor: {name: string, value: number} = {name: '', value: 0};
  for(const author in authorNameAndValue)
    if(authorNameAndValue[author] > maxTrendsCreatedAuthor.value)
      maxTrendsCreatedAuthor = {name: author, value: authorNameAndValue[author]};

  return maxTrendsCreatedAuthor.name;
  }