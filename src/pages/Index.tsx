import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'О нас', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Блог', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const PRODUCTS = [
  { id: 1, name: 'Косметичка Soft', price: 2490, size: 'S', color: 'Беж', material: 'Кожа', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/a15c2be7-fa95-4359-8a74-9d03a2168c90.jpg' },
  { id: 2, name: 'Сумка Lumé Tote', price: 6900, size: 'L', color: 'Терракота', material: 'Кожа', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/8374b86e-9ec1-475d-89f4-416ea7e45792.jpg' },
  { id: 3, name: 'Несессер Travel', price: 3200, size: 'M', color: 'Песок', material: 'Текстиль', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/a15c2be7-fa95-4359-8a74-9d03a2168c90.jpg' },
  { id: 4, name: 'Сумка Mini Crossbody', price: 5400, size: 'S', color: 'Беж', material: 'Замша', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/8374b86e-9ec1-475d-89f4-416ea7e45792.jpg' },
  { id: 5, name: 'Косметичка Duo', price: 1890, size: 'M', color: 'Терракота', material: 'Текстиль', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/a15c2be7-fa95-4359-8a74-9d03a2168c90.jpg' },
  { id: 6, name: 'Шоппер Daily', price: 4100, size: 'L', color: 'Песок', material: 'Замша', img: 'https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/8374b86e-9ec1-475d-89f4-416ea7e45792.jpg' },
];

const SIZES = ['S', 'M', 'L'];
const COLORS = ['Беж', 'Терракота', 'Песок'];
const MATERIALS = ['Кожа', 'Замша', 'Текстиль'];

const REVIEWS = [
  { name: 'Анна К.', text: 'Косметичка превзошла ожидания — кожа мягкая, швы идеальные. Беру вторую в подарок.', rating: 5 },
  { name: 'Мария Л.', text: 'Сумка Tote стала любимой. Вмещает всё и выглядит дорого. Спасибо!', rating: 5 },
  { name: 'Ольга В.', text: 'Заказывала несессер в поездку — компактный и стильный. Рекомендую.', rating: 5 },
];

const POSTS = [
  { tag: 'Уход', title: 'Как ухаживать за кожаными аксессуарами', date: '12 июня' },
  { tag: 'Стиль', title: '5 способов носить сумку-шоппер', date: '03 июня' },
  { tag: 'Тренды', title: 'Палитра сезона: тёплые оттенки терракоты', date: '28 мая' },
];

const FAQ = [
  { q: 'Какие способы доставки доступны?', a: 'Доставляем курьером по городу, СДЭК и Почтой России по всей стране. Сроки — от 1 до 7 дней.' },
  { q: 'Можно ли вернуть товар?', a: 'Да, в течение 14 дней при сохранении товарного вида и упаковки.' },
  { q: 'Из чего сделаны изделия?', a: 'Используем натуральную кожу, замшу и плотный текстиль премиум-качества.' },
  { q: 'Есть ли гарантия?', a: 'На все изделия из кожи действует гарантия 6 месяцев.' },
];

const Index = () => {
  const [price, setPrice] = useState([7000]);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  const filtered = PRODUCTS.filter(
    (p) =>
      p.price <= price[0] &&
      (!size || p.size === size) &&
      (!color || p.color === color) &&
      (!material || p.material === material)
  );

  const toggle = (set: (v: string | null) => void, cur: string | null, val: string) =>
    set(cur === val ? null : val);

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h4 className="font-medium text-sm uppercase tracking-widest text-muted-foreground">Цена</h4>
          <span className="font-display text-xl">{price[0].toLocaleString()} ₽</span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={1000} max={7000} step={100} />
      </div>
      <FilterGroup title="Размер" items={SIZES} active={size} onPick={(v) => toggle(setSize, size, v)} />
      <FilterGroup title="Цвет" items={COLORS} active={color} onPick={(v) => toggle(setColor, color, v)} />
      <FilterGroup title="Материал" items={MATERIALS} active={material} onPick={(v) => toggle(setMaterial, material, v)} />
      <button
        onClick={() => { setPrice([7000]); setSize(null); setColor(null); setMaterial(null); }}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
      >
        <Icon name="RotateCcw" size={14} /> Сбросить фильтры
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="font-display text-2xl font-semibold tracking-tight">LUMÉ</a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Корзина пуста. Добавьте товары из каталога.</p>
                  ) : (
                    <>
                      {cart.map((id, i) => {
                        const p = PRODUCTS.find((x) => x.id === id)!;
                        return (
                          <div key={i} className="flex items-center gap-3 pb-4 border-b border-border">
                            <img src={p.img} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{p.name}</p>
                              <p className="text-sm text-muted-foreground">{p.price.toLocaleString()} ₽</p>
                            </div>
                            <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))}>
                              <Icon name="X" size={16} className="text-muted-foreground" />
                            </button>
                          </div>
                        );
                      })}
                      <div className="flex justify-between pt-2 font-display text-xl">
                        <span>Итого</span>
                        <span>{cart.reduce((s, id) => s + PRODUCTS.find((p) => p.id === id)!.price, 0).toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full mt-4">Оформить заказ</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-16 overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="animate-fade-up">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1">Новая коллекция 2026</Badge>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] text-balance mb-6">
              Косметички и сумки <em className="text-accent not-italic">с характером</em>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Аксессуары из натуральной кожи и текстиля в тёплых оттенках. Создано, чтобы быть с вами каждый день.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild><a href="#catalog">Смотреть каталог</a></Button>
              <Button size="lg" variant="outline" asChild><a href="#about">О бренде</a></Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/8374b86e-9ec1-475d-89f4-416ea7e45792.jpg" alt="Косметички и сумки" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl px-6 py-4 shadow-xl hidden md:block">
              <p className="font-display text-3xl">4.9★</p>
              <p className="text-xs text-muted-foreground">2 400+ отзывов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-20 border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="uppercase tracking-widest text-xs text-accent mb-2">Каталог</p>
              <h2 className="font-display text-4xl md:text-5xl">Найдите своё</h2>
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm"><Icon name="SlidersHorizontal" size={16} className="mr-2" />Фильтры</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader><SheetTitle className="font-display text-2xl">Фильтры</SheetTitle></SheetHeader>
                  <div className="mt-8"><FilterPanel /></div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-24"><FilterPanel /></div>
            </aside>

            <div>
              <p className="text-sm text-muted-foreground mb-6">{filtered.length} товаров</p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <article key={p.id} className="group">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4 relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <Button
                        size="icon"
                        onClick={() => setCart([...cart, p.id])}
                        className="absolute bottom-3 right-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{p.name}</h3>
                        <p className="text-xs text-muted-foreground">{p.material} · {p.color} · {p.size}</p>
                      </div>
                      <span className="font-display text-xl whitespace-nowrap">{p.price.toLocaleString()} ₽</span>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-50" />
                  Ничего не найдено. Измените фильтры.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-secondary/40 border-y border-border">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
            <img src="https://cdn.poehali.dev/projects/9428f04f-c1d2-4a5e-8566-9d6aaea41b23/files/a15c2be7-fa95-4359-8a74-9d03a2168c90.jpg" alt="О нас" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="uppercase tracking-widest text-xs text-accent mb-2">О нас</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Мастерская тёплых деталей</h2>
            <p className="text-muted-foreground mb-4">
              LUMÉ — это маленькая мастерская, где каждая косметичка и сумка создаётся вручную. Мы выбираем натуральные материалы и спокойные оттенки, которые остаются актуальными годами.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[['8', 'лет на рынке'], ['50k', 'счастливых клиентов'], ['100%', 'ручная работа']].map(([n, t]) => (
                <div key={t}>
                  <p className="font-display text-3xl text-accent">{n}</p>
                  <p className="text-xs text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="container">
          <div className="text-center mb-14">
            <p className="uppercase tracking-widest text-xs text-accent mb-2">Отзывы</p>
            <h2 className="font-display text-4xl md:text-5xl">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card border border-border rounded-2xl p-8">
                <div className="flex gap-1 mb-4 text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => <Icon key={i} name="Star" size={16} fill="currentColor" />)}
                </div>
                <p className="text-foreground/90 mb-6 leading-relaxed">«{r.text}»</p>
                <p className="font-medium text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 bg-secondary/40 border-y border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="uppercase tracking-widest text-xs text-accent mb-2">Блог</p>
              <h2 className="font-display text-4xl md:text-5xl">Журнал LUMÉ</h2>
            </div>
            <Button variant="ghost" className="hidden sm:inline-flex">Все статьи <Icon name="ArrowRight" size={16} className="ml-2" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <article key={post.title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
                <Badge variant="secondary" className="rounded-full mb-4">{post.tag}</Badge>
                <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <p className="uppercase tracking-widest text-xs text-accent mb-2">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-lg">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 bg-primary text-primary-foreground">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <p className="uppercase tracking-widest text-xs opacity-70 mb-2">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-balance">Останемся на связи</h2>
            <div className="space-y-4">
              {[['Mail', 'hello@lume.ru'], ['Phone', '+7 (495) 123-45-67'], ['MapPin', 'Москва, ул. Тёплая, 12']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon} size={20} className="opacity-70" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              {['Instagram', 'Send', 'Youtube'].map((i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors">
                  <Icon name={i} size={18} />
                </a>
              ))}
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-3 placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground/50" placeholder="Ваше имя" />
            <input className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-3 placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground/50" placeholder="Email" />
            <textarea rows={4} className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-3 placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground/50 resize-none" placeholder="Сообщение" />
            <Button type="submit" variant="secondary" size="lg" className="w-full">Отправить</Button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-xl text-foreground mb-2">LUMÉ</p>
        © 2026 LUMÉ. Все права защищены.
      </footer>
    </div>
  );
};

const FilterGroup = ({ title, items, active, onPick }: { title: string; items: string[]; active: string | null; onPick: (v: string) => void }) => (
  <div>
    <h4 className="font-medium text-sm uppercase tracking-widest text-muted-foreground mb-4">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onPick(item)}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
            active === item ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default Index;
