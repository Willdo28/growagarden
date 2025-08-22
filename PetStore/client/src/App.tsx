import { useState } from 'react';
import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ToastContainer } from '@/components/toast-manager';
import Home from '@/pages/home';
import Shop from '@/pages/shop';
import Cart from '@/pages/cart';
import FAQ from '@/pages/faq';
import Policies from '@/pages/policies';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [shopFilter, setShopFilter] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelect = (filter: string) => {
    setShopFilter(filter);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header onSearch={handleSearch} />
          
          <div className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/shop">
                <Shop searchQuery={searchQuery} initialFilter={shopFilter} />
              </Route>
              <Route path="/cart" component={Cart} />
              <Route path="/faq" component={FAQ} />
              <Route path="/policies" component={Policies} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </div>
          
          <Footer onFilterSelect={handleFilterSelect} />
          <ToastContainer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
