import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  title: string;
  link: string;
  votes: number;

  constructor() {
    this.title = 'Angular 2';
    this.link = 'http://angular.io';
    this.votes = 10;
  }

  ngOnInit(): void {
  }

  voteDown(): boolean {
    this.votes -= 1;
    return false;
  }

  voteUp(): boolean {
    this.votes += 1;
    return false;
  }
}
