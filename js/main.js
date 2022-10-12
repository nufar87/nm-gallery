'use strict';

$(document).ready(init);

function init() {
  renderPortfolio();
}

function renderPortfolio() {
  var projects = getProjects();
  var strHTMLs = projects
    .map(function (proj) {
      return `
        <div class="col-md-4 col-sm-6 portfolio-item" onclick="onOpenModal('${proj.id}')">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
              </div>
              </div>
              <img class="img-thumbnail radius-7" src="img/portfolio/${proj.id}.jpg" alt="">
              </a>
              <div class="portfolio-caption">
              <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div>
        `;
    })
    .join('');
  $('.portfolio-items').html(strHTMLs);
}

function onSend() {
  var name = $('.name').val();
  var email = $('.email').val();
  var message = $('.message').val();
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=nufar.maimon@gmail.com&su=${name}&body=${message}`
  );
  openCanvas();
}

function onOpenModal(projId) {
  var proj = getProjById(projId);
  var link = `projects/${proj.id}/index.html`;

  $('.modal-proj-name').text(proj.name);
  $('.modal-proj-title').text(proj.title);
  $('.modal p.desc').text(proj.des);
  $('li.date span').text(proj.date);
  $('.modal-proj-img').attr('src', `img/portfolio/${proj.id}.png`);
  $('.modal-proj-link').attr('href', link);
}
