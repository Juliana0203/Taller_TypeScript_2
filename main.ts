import { series } from './data.js';
import { Serie } from './Serie.js';

function renderSeriesTable(series) {
  const tableBody = document.getElementById('series-table-body');
  if (tableBody) {
    tableBody.innerHTML = ''; 
    series.forEach((serie) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${serie.id}</td>
        <td><a href="#" class="series-link" data-id="${serie.id}">${serie.name}</a></td>
        <td>${serie.channel}</td>
        <td>${serie.seasons}</td>
      `;
      row.querySelector('.series-link')!.addEventListener('click', (event) => {
        event.preventDefault();
    
        showSeriesDetails(serie);
      });
      tableBody.appendChild(row);
    });
  }
}

function calculateAverageSeasons(series) {
  const totalSeasons = series.reduce((acc, serie) => acc + serie.seasons, 0);
  return series.length > 0 ? totalSeasons / series.length : 0;
}

function renderAverageSeasons(series) {
  const averageElement = document.getElementById('average-seasons');
  const average = calculateAverageSeasons(series);
  if (averageElement) {
    averageElement.textContent = `Average seasons: ${average.toFixed(2)}`;
  }
}

function showSeriesDetails(serie: Serie) {
    const seriesDetails = document.getElementById('series-details')!;
    const seriesImage = document.getElementById('series-image') as HTMLImageElement;
    const seriesTitle = document.getElementById('series-title')!;
    const seriesDescription = document.getElementById('series-description')!;
    const seriesLink = document.getElementById('series-link') as HTMLAnchorElement;
  
    seriesImage.src = serie.image;
    seriesTitle.textContent = serie.name;
    seriesDescription.textContent = serie.description;
    seriesLink.href = serie.link;
  
    seriesDetails.style.display = 'block'; 
  }
  

function initialize() {
  renderSeriesTable(series);
  renderAverageSeasons(series);
}

document.addEventListener('DOMContentLoaded', initialize);
