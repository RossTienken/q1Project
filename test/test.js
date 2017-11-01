const expect = chai.expect;

describe('ptsFunc', function () {
  it('should return a string with the players first and last name, and his points', function () {
    let player = {
      "player": {
        "ID": "5605",
        "LastName": "A Test",
        "FirstName": "This Is",
        "JerseyNumber": "96",
        "Position": "RW",
        "Height": "6'4\"",
        "Weight": "211",
        "BirthDate": "1996-10-29",
        "Age": "21",
        "BirthCity": "Nousiainen",
        "BirthCountry": "Finland",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "11"
        },
        "stats": {
          "Points": {
            "@abbreviation": "Pts",
            "#text": "10"
          }
        }
      }
    }
    expect(ptsFunc(player)).to.equal('<h4>This Is A Test</h4><h5>10</h5>')
  })
})
describe('goalFunc', function () {
  it('should return a string with the players first and last name, and his goals', function () {
    let player = {
      "player": {
        "ID": "5494",
        "LastName": "Andrighetto",
        "FirstName": "Sven",
        "JerseyNumber": "10",
        "Position": "RW",
        "Height": "5'9\"",
        "Weight": "183",
        "BirthDate": "1993-03-21",
        "Age": "24",
        "BirthCity": "Zurich",
        "BirthCountry": "Switzerland",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "11"
        },
        "stats": {
          "Goals": {
            "@abbreviation": "G",
            "#text": "4"
          }
        }
      }
    }
    expect(goalFunc(player)).to.equal('<h4>Sven Andrighetto</h4><h5>4</h5>')
  })
})
describe('assistFunc', function () {
  it('should return a string with the players first and last name, and his assists', function () {
    let player = {
      "player": {
        "ID": "5075",
        "LastName": "Barrie",
        "FirstName": "Tyson",
        "JerseyNumber": "4",
        "Position": "D",
        "Height": "5'10\"",
        "Weight": "190",
        "BirthDate": "1991-07-26",
        "Age": "26",
        "BirthCity": "Victoria, BC",
        "BirthCountry": "Canada",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "11"
        },
        "stats": {
          "Assists": {
            "@abbreviation": "A",
            "#text": "7"
          }
        }
      }
    }
    expect(assistFunc(player)).to.equal('<h4>Tyson Barrie</h4><h5>7</h5>')
  })
})
describe('pimFunc', function () {
  it('should return a string with the players first and last name, and his penalty minutes', function () {
    let player = {
      "player": {
        "ID": "5634",
        "LastName": "Greer",
        "FirstName": "Anthony-John",
        "JerseyNumber": "24",
        "Position": "LW",
        "Height": "6'3\"",
        "Weight": "204",
        "BirthDate": "1996-12-14",
        "Age": "20",
        "BirthCity": "Joliette, QC",
        "BirthCountry": "Canada",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "3"
        },
        "stats": {
          "PenaltyMinutes": {
            "@abbreviation": "PIM",
            "#text": "16"
          }
        }
      }
    }
    expect(pimFunc(player)).to.equal('<h4>Anthony-John Greer</h4><h5>16</h5>')
  })
})
describe('winFunc', function () {
  it('should return a string with the goalies first and last name, and his wins', function () {
    let player = {
      "player": {
        "ID": "4592",
        "LastName": "Varlamov",
        "FirstName": "Semyon",
        "JerseyNumber": "1",
        "Position": "G",
        "Height": "6'2\"",
        "Weight": "209",
        "BirthDate": "1988-04-27",
        "Age": "29",
        "BirthCity": "Samara",
        "BirthCountry": "Russia",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "7"
        },
        "stats": {
          "Wins": {
            "@abbreviation": "W",
            "#text": "4"
          }
        }
      }
    }
    expect(winFunc(player)).to.equal('<h4>Semyon Varlamov</h4><h5>4</h5>')
  })
})

describe('gaaFunc', function () {
  it('should return a string with the goalies first and last name, and his goals agaisnt average', function () {
    let player = {
      "player": {
        "ID": "4271",
        "LastName": "Bernier",
        "FirstName": "Jonathan",
        "JerseyNumber": "45",
        "Position": "G",
        "Height": "6'0\"",
        "Weight": "185",
        "BirthDate": "1988-08-07",
        "Age": "29",
        "BirthCity": "Laval, QC",
        "BirthCountry": "Canada",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "4"
        },
        "stats": {
          "GoalsAgainstAverage": {
            "@abbreviation": "GAA",
            "#text": "3.051"
          }
        }
      }
    }
    expect(gaaFunc(player)).to.equal('<h4>Jonathan Bernier</h4><h5>3.051</h5>')
  })
})

describe('savePercent', function () {
  it('should return a string with the goalies first and last name, and his save percentage', function () {
    let player = {
      "player": {
        "ID": "4271",
        "LastName": "Bernier",
        "FirstName": "Jonathan",
        "JerseyNumber": "45",
        "Position": "G",
        "Height": "6'0\"",
        "Weight": "185",
        "BirthDate": "1988-08-07",
        "Age": "29",
        "BirthCity": "Laval, QC",
        "BirthCountry": "Canada",
        "IsRookie": "false"
      },
      "stats": {
        "GamesPlayed": {
          "@abbreviation": "GP",
          "#text": "4"
        },
        "stats": {
          "SavePercentage": {
            "@abbreviation": "Sv%",
            "#text": "0.555"
          }
        }
      }
    }
    expect(savePercent(player)).to.equal('<h4>Jonathan Bernier</h4><h5>0.555%</h5>')
  })
})
