# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


class Unit:
    def __init__(self, health, acc, damage, armor, speed, size):
        self.health = health
        self.acc = acc
        self.damage = damage
        self.armor = armor
        self.speed = speed
        self.size = size




class Wall(Unit):
    _LEVELS = {
        32: (1700, 0.8, 370, 128, 0, 30),
        33: (1750, 0.8, 380, 132, 0, 30)
    }

    def __init__(self, level):
        super().__init__(*self._LEVELS[level])


class Mortar(Unit):
    def __init__(self):
        super().__init__(32, 0.1, 270, 0, 40, 5)


class Hoplite(Unit):
    def __init__(self):
        super().__init__(56, 0.9, 18, 1, 60, 1)


class Clubman(Unit):
    def __init__(self):
        super().__init__(12, 0.85, 5, 1, 60, 1)


class Spearman(Unit):
    def __init__(self):
        super().__init__(13, 0.7, 4, 0, 60, 1)


class StreamGiant(Unit):
    def __init__(self):
        super().__init__(184, 0.8, 42, 3, 60, 3)


class Catapult(Unit):
    def __init__(self):
        super().__init__(54, 0.1, 133, 4, 40, 5)


class Carbine(Unit):
    def __init__(self):
        super().__init__(12, 0.7, 29, 0, 60, 4)


def club2_spear1():
    b = Clubman()
    s = Spearman()
    h = s.health - b.damage * 2
    h2 = b.health - (s.damage - b.armor) * s.acc
    print(h / s.health, h2 / b.health)


def club2_spear2():
    b = Clubman()
    s = Spearman()
    h = s.health - b.damage * 2
    print(h)


def main():
    s = StreamGiant()
    m = Mortar()
    c = Catapult()
    b = Carbine()
    print(s.health * 5, c.damage * 3 + m.damage + b.damage * 12)
    print(s.health * 7, c.damage * 5 + m.damage + b.damage * 12)


if __name__ == '__main__':
    main()
